import { ChatBotBuilder2Page } from './app.po';

describe('chat-bot-builder2 App', () => {
  let page: ChatBotBuilder2Page;

  beforeEach(() => {
    page = new ChatBotBuilder2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
