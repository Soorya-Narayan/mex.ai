import { test, expect } from "@playwright/test";

const ROUTES = [
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
  "/case-studies/cement-plant-energy-reduction",
  "/case-studies/automotive-vision-inspection",
  "/about",
  "/careers",
  "/insights",
  "/insights/physics-informed-ai-vs-ml",
  "/insights/iso-50001-roadmap",
  "/contact",
  "/privacy-policy",
  "/terms",
];

test.describe("MEX Automation Marketing Website — Smoke & SEO Audit", () => {
  for (const route of ROUTES) {
    test(`Route ${route} loads with HTTP 200 and exactly one H1`, async ({
      page,
    }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);

      const h1Count = await page.locator("h1").count();
      expect(h1Count).toBe(1);
    });
  }

  test("Custom 404 page renders on unknown route with navigation links", async ({
    page,
  }) => {
    const response = await page.goto("/non-existent-industrial-route");
    expect(response?.status()).toBe(404);
    await expect(page.locator("h1")).toContainText("Page Not Found");
    await expect(page.getByRole("link", { name: /Back to Home/i })).toBeVisible();
  });

  test("Contact form validates required fields and submits cleanly", async ({
    page,
  }) => {
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
