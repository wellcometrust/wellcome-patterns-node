import { Page } from 'playwright';
import { isMobile } from './contexts';
import { slowExpect } from './utils';

export const searchQuerySubmitAndWait = async (
  query: string,
  page: Page
): Promise<void> => {
  const searchBar = page.getByRole('searchbox');

  await searchBar.fill(query);
  await searchBar.press('Enter');
  await slowExpect(page).toHaveTitle(new RegExp(`.*${query}.*`, 'i'));
};

export const openFilterDropdown = async (name: string, page: Page) => {
  if (isMobile(page)) {
    await page.locator('button[aria-controls=mobile-filters-modal]').click();

    await slowExpect(
      page.getByRole('heading', { name: 'Filters', exact: true })
    ).toBeVisible();
  } else {
    await page.getByRole('button', { name }).click();
  }
};

export const selectAndWaitForFilter = async (
  filterName: string,
  checkboxId: string,
  page: Page
) => {
  await openFilterDropdown(filterName, page);

  const checkbox = page.locator(
    `input[form="search-page-form"][value="${checkboxId}"]`
  );

  await checkbox.click();

  if (isMobile(page)) {
    await page.getByRole('button', { name: 'Show results' }).click();
  } else {
    await slowExpect(checkbox).toBeChecked();
  }
};

export const navigateToNextPageAndConfirmNavigation = async (page: Page) => {
  const paginationInput = page.getByTestId('pagination').getByRole('textbox');

  const currentPage = await paginationInput.inputValue();
  const nextButton = page
    .getByTestId('pagination')
    .getByRole('link', { name: 'Next' });

  await nextButton.click();

  await slowExpect(paginationInput).toHaveValue(
    String(Number(currentPage) + 1)
  );
};

export const navigateToResultAndConfirmTitleMatches = async (
  n = 1,
  page: Page
) => {
  const result = `main ul li:nth-of-type(${n}) a`;
  const searchResultTitle = await page.textContent(`${result} h3`);
  await page.click(result);

  const title = await page.locator('h1');
  await slowExpect(title).toHaveId('work-info');
  await slowExpect(title).toContainText(String(searchResultTitle)); // searchResultTitle could also be null but I expect it would fail accordingly
};

export const clickImageSearchResultItem = async (
  nthChild: number,
  page: Page
): Promise<void> => {
  await page
    .getByTestId('image-search-results-container')
    .locator(`ul:first-child > li:nth-child(${nthChild}) a`)
    .click();
  await slowExpect(page.getByLabel('View expanded image')).toBeVisible();
};

// TODO
// This could probably be better - We should have a different way of spotting if a filter is applied
// Especially for mobile where they are hidden in the modal.
// This isn't solid for multiple reasons such as the fact that "books" could be found multiple times without being the one you want.
//
// As we are considering a redesign of filters, this should be considered as part of it
export const testIfFilterIsApplied = async (label: string, page: Page) => {
  await slowExpect(
    page.getByRole('status').filter({ hasText: 'filtered with' })
  ).toHaveText(new RegExp(`.*${label}.*`, 'i'));
};

// Images specific
export const selectAndWaitForColourFilter = async (page: Page) => {
  await openFilterDropdown('Colour', page);
  await page.getByRole('button', { name: 'Red' }).click();
  await testIfFilterIsApplied('red', page);

  // Close modal box by applying the filter, or ensure the desktop filter box is closed
  if (isMobile(page)) {
    await page.getByRole('button', { name: 'Show results' }).click();
  } else {
    await page.getByRole('button', { name: 'Colours' }).click();
  }
};
