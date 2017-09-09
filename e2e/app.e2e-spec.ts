import { RxWorkshopNgPage } from './app.po';

describe('rx-workshop-ng App', () => {
  let page: RxWorkshopNgPage;

  beforeEach(() => {
    page = new RxWorkshopNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
