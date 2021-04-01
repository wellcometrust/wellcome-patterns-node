import { multiVolumeItem, itemWithSearchAndStructures } from './contexts';
import { isMobile } from './actions/common';
import { volumesNavigationLabel, searchWithinLabel } from './text/aria-labels';
import {
  zoomInButton,
  rotateButton,
  openseadragonCanvas,
  fullscreenButton,
  searchWithinResultsHeader,
  mainViewer,
} from './selectors/item';
import { baseUrl } from './helpers/urls';

const domain = new URL(baseUrl).host;

const searchWithinTextInput = `[aria-label="${searchWithinLabel}"]`;
async function searchWithin(query: string) {
  await page.fill(searchWithinTextInput, query);
  await page.press(searchWithinTextInput, 'Enter');
}

beforeAll(async () => {
  await context.addCookies([
    { name: 'WC_cookiesAccepted', value: 'true', domain: domain, path: '/' },
    {
      name: 'toggle_itemViewerPrototypeWithSearch',
      value: 'true',
      domain: domain,
      path: '/',
    },
  ]);
});

describe('Scenario 1: A user wants a large-scale view of an item', () => {
  test('the images are scalable', async () => {
    await multiVolumeItem();
    if (!isMobile()) {
      // TODO work out why this is causing issues on mobile
      await page.waitForSelector(fullscreenButton);
      await page.click(fullscreenButton);
    }
    // check full screen
    await page.waitForSelector(zoomInButton);
    await page.click(zoomInButton);
    await page.waitForSelector(openseadragonCanvas);
    // expect(openseadragonCanvas).toBeTruthy();
  });
});

describe('Scenario 4: A user wants to know how they can make use of an item', () => {
  test('license information should be available', async () => {
    await itemWithSearchAndStructures();
    if (isMobile()) {
      page.click('text="Item info"');
    }
    await page.click('text="License and credit"');
    await page.waitForSelector(`css=body >> text="License:"`);
    await page.waitForSelector(`css=body >> text="Credit:"`);
  });
});

describe('Scenario 5: A user wants to view an item in a different orientation', () => {
  test('the image should rotate', async () => {
    await itemWithSearchAndStructures();
    await page.waitForSelector(rotateButton);
    await page.click(rotateButton);
    if (!isMobile()) {
      const currentIndex = await page.textContent(
        '[data-test-id=active-index]'
      );
      const currentImageSrc = await page.getAttribute(
        `[data-test-id=canvas-${Number(currentIndex) - 1}] img`,
        'src'
      );
      expect(currentImageSrc).toContain('/90/default.jpg');
    }
  });
});

describe('Scenario 6: Item has multiple volumes', () => {
  test('the volumes should be browsable', async () => {
    if (!isMobile()) {
      await multiVolumeItem();
      await page.waitForSelector(`css=body >> text="Volumes"`);
      await page.click('text="Volumes"');
      const navigationSelector = `[role="navigation"][aria-label="${volumesNavigationLabel}"]`;
      await page.waitForSelector(navigationSelector);

      const navigationVisible = await page.isVisible(navigationSelector);
      expect(navigationVisible).toBeTruthy();

      const currentManifestLinkLabel = await page.textContent(
        `${navigationSelector} a[aria-current="page"]`
      );

      const currentManifestLabel = await page.textContent(
        '[data-test-id=current-manifest]'
      );

      expect(currentManifestLinkLabel).toEqual(currentManifestLabel);

      const nextManifestLinkSelector = `${navigationSelector} a:not([aria-current="page"])`;
      const nextManifestLinkLabel = await page.textContent(
        nextManifestLinkSelector
      );

      await page.click(nextManifestLinkSelector);

      await page.waitForSelector(
        `css=[data-test-id=current-manifest] >> text="${nextManifestLinkLabel}"`
      );
    }
  });
});

describe('Scenario 7: A user wants to navigate an item by its parts', () => {
  test('the structured parts should be browseable', async () => {
    await itemWithSearchAndStructures();
    if (isMobile()) {
      page.click('text="Item info"');
    }
    await page.click('css=body >> text="Contents"');
    await page.waitForSelector('css=body >> text="Title Page"');
    await page.click('text="Title Page"');
    await page.waitForSelector(`css=[data-test-id=active-index] >> text="5"`);
  });
});

async function scrollToBottom(page, selector) {
  await page.$eval(selector, element => {
    element.scrollTo(0, element.scrollHeight);
  });
}

describe('Scenario 8: A user wants to be able to see all the images for an item', () => {
  test('the main viewer can be scrolled', async () => {
    await itemWithSearchAndStructures();
    await scrollToBottom(page, mainViewer);
    await page.waitForSelector(`css=[data-test-id=active-index] >> text="68"`);
  });
});

describe("Scenario 9: A user wants to be able to search inside an item's text", () => {
  test('the item should be searchable', async () => {
    await itemWithSearchAndStructures();
    if (isMobile()) {
      page.click('text="Item info"');
    }
    await searchWithin('darwin');
    await page.waitForSelector(searchWithinResultsHeader);
    await page.click(`${searchWithinResultsHeader} + ul li:first-of-type a`);
    await page.waitForSelector(`css=[data-test-id=active-index] >> text="5"`);
  });
});
