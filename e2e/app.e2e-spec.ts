import { Cs4400ProjPage } from './app.po';

describe('cs4400-proj App', () => {
  let page: Cs4400ProjPage;

  beforeEach(() => {
    page = new Cs4400ProjPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
