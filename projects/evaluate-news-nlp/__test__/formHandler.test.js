import { formHandler } from '..src/client/js/formhandler'; // Adjust the import path as per your project structure

describe('formHandler function', () => {
  beforeEach(() => {
// paste mock HTML 
    document.body.innerHTML = `
      <form>
        <input type="text" id="url" />
        <button type="submit" id="submit-btn">Submit</button>
      </form>
      <div>
        <span id="score_tag"></span>
        <span id="agreement"></span>
        <span id="subjectivity"></span>
        <span id="confidence"></span>
        <span id="irony"></span>
      </div>
    `;
  });

  it('should show an alert when formText is empty', () => {
// simulate form submission with empty data
    formHandler(new Event('submit'));

// show mock alert
    expect(window.alert).toHaveBeenCalledWith('Please enter valid URL');
  });

  it('should call updateUI when the server returns valid data', async () => {
// simulate correct fetch response using mock data
    const mockData = {
      ok: true,
      json: () => Promise.resolve({
        data: {
          score_tag: 'positive',
          agreement: 'AGREEMENT',
          subjectivity: 'SUBJECTIVE',
          confidence: '0.85',
          irony: 'NONIRONIC',
        },
      }),
    };

    jest.spyOn(window, 'fetch').mockImplementation(() => Promise.resolve(mockData));

// simulate form submission with valid data
    document.getElementById('url').value = 'https://example.com';
    await formHandler(new Event('submit'));

// updateUI is called with valid data
    expect(window.fetch).toHaveBeenCalledWith('/submitData', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ url: 'https://example.com' }),
    }));
    expect(document.getElementById('score_tag').textContent).toBe('Score Tag: positive');
    expect(document.getElementById('agreement').textContent).toBe('Agreement: AGREEMENT');
    expect(document.getElementById('subjectivity').textContent).toBe('Subjectivity: SUBJECTIVE');
    expect(document.getElementById('confidence').textContent).toBe('Confidence: 0.85');
    expect(document.getElementById('irony').textContent).toBe('Irony: NONIRONIC');
  });

  it('should show an alert when the server returns an error', async () => {
// mock fetch response with error
    const mockData = {
      ok: false,
    };

    jest.spyOn(window, 'fetch').mockImplementation(() => Promise.resolve(mockData));
    jest.spyOn(window, 'alert');

// simulate form submission with valid data
    document.getElementById('url').value = 'https://example.com';
    await formHandler(new Event('submit'));

// show mock alert
    expect(window.alert).toHaveBeenCalledWith('Error processing the request. Please try again later.');
  });
});