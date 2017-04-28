import { VideosListPage } from './app.po';

describe('videos-list App', function() {
  let page: VideosListPage;

  beforeEach(() => {
    page = new VideosListPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
