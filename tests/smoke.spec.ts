import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PUBLIC_ROUTES = [
  "/",
  "/products",
  "/products/heatwatch",
  "/products/crate-pouch-counting",
  "/products/bottle-counting",
  "/products/data-logger",
  "/products/dashboards",
  "/products/twinforge-studio",
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
  "/products/digital-twin",
  "/products/vision-systems",
  "/products/energy-monitoring-systems",
  "/case-studies/milma-kottayam-crate-pouch-counting",
  "/case-studies/muralya-dairy-bottle-counting",
  "/case-studies/anik-dairy-data-logger",
  "/case-studies/zoladyne-energy-dashboard",
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

      await expect(page.locator("h1")).toHaveCount(1);

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

  test("Sitemap includes all six products and excludes unpublished case studies and insights", async ({
    request,
  }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const xml = await res.text();
    expect(xml).toContain("/products/heatwatch");
    expect(xml).toContain("/products/crate-pouch-counting");
    expect(xml).toContain("/products/bottle-counting");
    expect(xml).toContain("/products/data-logger");
    expect(xml).toContain("/products/dashboards");
    expect(xml).toContain("/products/twinforge-studio");
    expect(xml).not.toContain("/products/digital-twin");
    expect(xml).not.toContain("/products/vision-systems");
    expect(xml).not.toContain("/products/energy-monitoring-systems");
    expect(xml).not.toContain("milma-kottayam-crate-pouch-counting");
    expect(xml).not.toContain("muralya-dairy-bottle-counting");
    expect(xml).not.toContain("anik-dairy-data-logger");
    expect(xml).not.toContain("zoladyne-energy-dashboard");
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
    await page.fill("#contact-company", "Malabar Dairy Processing");
    await page.fill("#contact-email", "ananya@malabardairy.in");
    await page.fill(
      "#contact-message",
      "We would like to evaluate HeatWatch for continuous pasteurizer temperature monitoring."
    );
    await page.locator('input[name="consent"]').check();
    await page.getByRole("button", { name: /Send Message/i }).click();

    await expect(page.getByText(/Inquiry Received/i)).toBeVisible();
  });

  test("Careers form validates required fields and submits via POST /api/careers without exposing data in URL", async ({
    page,
  }) => {
    let capturedMethod = "";
    let capturedPostData: unknown = null;

    await page.route("/api/careers", async (route) => {
      capturedMethod = route.request().method();
      capturedPostData = route.request().postDataJSON();
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto("/careers");
    await page.getByRole("button", { name: /Submit Application/i }).click();
    await expect(page.getByText(/Please enter your full name/i)).toBeVisible();

    await page.fill("#career-name", "Priya Nair");
    await page.fill("#career-email", "priya@example.com");
    await page.fill("#career-resume", "https://linkedin.com/in/priyanair");
    await page.fill(
      "#career-note",
      "Experienced with PLC programming and edge computer vision inference pipelines."
    );
    await page.locator('input[name="consent"]').check();
    await page.getByRole("button", { name: /Submit Application/i }).click();

    await expect(page.getByText(/Application Submitted/i)).toBeVisible();
    expect(capturedMethod).toBe("POST");
    expect((capturedPostData as Record<string, unknown>)?.name).toBe("Priya Nair");
    expect(page.url()).not.toContain("Priya");
    expect(page.url()).not.toContain("priya@example.com");
  });

  test("GA4 script does not load before cookie consent is granted", async ({
    page,
  }) => {
    await page.goto("/");
    const gaScriptCount = await page.locator("#ga4-gtag-script").count();
    expect(gaScriptCount).toBe(0);
  });
});
