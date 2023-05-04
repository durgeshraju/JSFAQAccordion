// Set the URL for the JSON data
const FETCH_FAQ_DATA = 'faqs.json';

// Define the FaqAccordion class
class FaqAccordion {
  constructor(element) {
    this.element = element;
    this.faqs = [];
  }

  // Fetch the FAQ data from the JSON file
  async fetchFaqs() {
    try {
      const response = await fetch(FETCH_FAQ_DATA);
      const data = await response.json();
      this.faqs = data;
      this.render();
    } catch (err) {
      console.log(err);
    }
  }

  // Render the FAQ data on the page and add event listeners
  render() {
    const faqsHtml = this.faqs.map((faq, index) => `
      <div class="faq-accordion-qna-container">
        <div class="faq-accordion-qn" data-index="${index}">
          ${faq.question} 
          <i class="fas fa-chevron-down"></i>
        </div>
        <p class="faq-accordion-ans" data-index="${index}">${faq.answer}</p>
      </div>
    `).join('');
    this.element.innerHTML = faqsHtml;

    const questionElements = this.element.querySelectorAll('.faq-accordion-qn');
    questionElements.forEach(questionElement => {      
      questionElement.addEventListener('click', () => {        
        const index = questionElement.getAttribute('data-index');
        questionElements.forEach(question => {          
        question.getAttribute('data-index') !== index ? (
          question.classList.remove('active'),
          this.element.querySelector(`.faq-accordion-ans[data-index="${question.getAttribute('data-index')}"]`).classList.remove('active')
        ) : null;
        });
        questionElement.classList.toggle('active');
        const answerElement = this.element.querySelector(`.faq-accordion-ans[data-index="${index}"]`);
        answerElement.classList.toggle('active');
      });
    });
  }
}

// Create a new instance of the FaqAccordion class and fetch the data
const faqAccordion = new FaqAccordion(document.querySelector('#faqAccordion'));
faqAccordion.fetchFaqs();