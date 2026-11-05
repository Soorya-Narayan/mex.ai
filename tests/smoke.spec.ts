import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PUBLIC_ROUTES = [
  "/",
  "/products",
  "/products/heatwatch",
  "/products/digital-twin",
  "/products/vision-systems",
  "/products/energy-monitoring-systems",
  "/products/data-logger",
  "/products/dashboards",
  "/industries",
  "/case-studies",
  "/about",
  "/careers",
  "/insights",
  "/contact",
  "/privacy-policy",
  "/terms",
];

const UNPUBLISHED_ROUTES = [
  "/case-studies/cement-plant-energy-reduction",
  "/case-studies/automotive-vision-inspection",
  "/insights/physics-informed-ai-vs-ml",
  "/insights/iso-50001-roadmap",
];

test.describe("MEX Automation Marketing Website — Smoke, Content & A11y Audit", () => {
  for (const route of PUBLIC_ROUTES) {
    test(`Route ${route} loads with HTTP 200, one H1, and no [PLACEHOLDER] text`, async ({
      page,
    }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);

      const h1Count = await page.locator("h1").count();
      expect(h1Count).toBe(1);

      const bodyText = await page.locator("body").innerText();
      expect(bodyText).not.toContain("[PLACEHOLDER");
    });
  }

  for (const route of UNPUBLISHED_ROUTES) {
    test(`Unpublished route ${route} returns HTTP 404`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(404);
    });
  }

  test("Sitemap excludes unpublished case studies and insights", async ({
    request,
  }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const xml = await res.text();
    expect(xml).toContain("/products/heatwatch");
    expect(xml).not.toContain("cement-plant-energy-reduction");
    expect(xml).not.toContain("automotive-vision-inspection");
    expect(xml).not.toContain("physics-informed-ai-vs-ml");
    expect(xml).not.toContain("iso-50001-roadmap");
  });

  test("Accessibility (axe-core WCAG 2A/2AA) passes on core templates", async ({
    page,
  }) => {
    for (const path of ["/", "/products", "/products/heatwatch", "/contact"]) {
      await page.goto(path);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa"])
        .exclude("#turnstile-container")
        .analyze();
      expect(results.violations).toEqual([]);
    }
  });

  test("Custom 404 page renders on unknown route with navigation links", async ({
    page,
  }) => {
    const response = await page.goto("/non-existent-industrial-route");
    expect(response?.status()).toBe(404);
    await expect(page.locator("h1")).toContainText("Page Not Found");
    await expect(
      page.getByRole("link", { name: /Back to Home/i })
    ).toBeVisible();
  });

  test("Contact form validates required fields and submits cleanly", async ({
    page,
  }) => {
    await page.route("/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto("/contact");
    await page.getByRole("button", { name: /Send Message/i }).click();
    await expect(page.getByText(/Please enter your full name/i)).toBeVisible();

    await page.fill("#contact-name", "Ananya Deshmukh");
    await page.fill("#contact-company", "Bharat Cement Works");
    await page.fill("#contact-email", "ananya@bharatcement.in");
    await page.fill(
      "#contact-message",
      "We would like to evaluate HeatWatch for our rotary kiln shell monitoring."
    );
    await page.locator('input[name="consent"]').check();
    await page.getByRole("button", { name: /Send Message/i }).click();

    await expect(page.getByText(/Inquiry Received/i)).toBeVisible();
  });

  test("GA4 script does not load before cookie consent is granted", async ({
    page,
  }) => {
    await page.goto("/");
    const gaScriptCount = await page.locator("#ga4-gtag-script").count();
    expect(gaScriptCount).toBe(0);
  });
});
