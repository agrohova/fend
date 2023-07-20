import { updateUI } from '../src/client/js/formHandler';
import { JSDOM } from 'jsdom';

describe('updateUI', () => {
  let dom;
  let document;

  beforeEach(() => {
 // Mock the necessary DOM elements
 const htmlContent = `
 <div id="score_tag"></div>
 <div id="agreement"></div>
 <div id="subjectivity"></div>
 <div id="confidence"></div>
 <div id="irony"></div>
`;

// Create a simulated DOM
dom = new JSDOM(htmlContent);
document = dom.window.document;
});

  afterEach(() => {
    // Clean up the DOM after each test
    dom.window.close();
  });

  test('should update the UI with the provided analysis result', () => {
    const analysisResult = {
      score_tag: 'positive',
      agreement: 'agreed',
      subjectivity: 'subjective',
      confidence: 0.85,
      irony: 'non-ironic',
    };

    updateUI(analysisResult, document);

    // Assert that the DOM elements have been updated correctly
    expect(document.getElementById('score_tag').innerHTML).toBe(`Score Tag: ${analysisResult.score_tag}`);
    expect(document.getElementById('agreement').innerHTML).toBe(`Agreement: ${analysisResult.agreement}`);
    expect(document.getElementById('subjectivity').innerHTML).toBe(`Subjectivity: ${analysisResult.subjectivity}`);
    expect(document.getElementById('confidence').innerHTML).toBe(`Confidence: ${analysisResult.confidence}`);
    expect(document.getElementById('irony').innerHTML).toBe(`Irony: ${analysisResult.irony}`);
  });
});