import re

with open('src/pages/Index.tsx', 'r') as f:
    content = f.read()

# Replace openApplication with window.open
content = content.replace('onClick={() => openApplication()}', 'onClick={() => window.open("#", "_blank")}')
# There might be some openApplication calls in the top navbar too, let's just do a regex replace
content = re.sub(r'onClick=\{\(\) => openApplication\([^)]*\)\}', 'onClick={() => window.open("#", "_blank")}', content)

new_process = """      <section className="process corners" id="process">
        <h2>How to apply</h2>

        <div className="process-grid">
          <div className="steps">
            <div className="step">
              <div className="n">01</div>
              <div>
                <h4>Registration</h4>
                <p>Register your project, prototype, product or early-stage venture through the common registration form.</p>
              </div>
            </div>

            <div className="step">
              <div className="n">02</div>
              <div>
                <h4>Internal Scrutiny</h4>
                <p>If we receive more than 10 responses, an internal scrutiny will be conducted on Oct 13 to shortlist showcase-ready projects.</p>
              </div>
            </div>

            <div className="step">
              <div className="n">03</div>
              <div>
                <h4>Main Event Showcase</h4>
                <p>Selected teams will present to industry experts, entrepreneurs, investors and regulatory officials on Oct 16.</p>
              </div>
            </div>

            <div className="step">
              <div className="n">04</div>
              <div>
                <h4>Feedback &amp; Opportunities</h4>
                <p>Receive practical guidance, mentoring, and potential opportunities for incubation, pilot deployment or further investment.</p>
              </div>
            </div>
          </div>

          <div className="mockup">
            <div className="mockup-bar">
              <span />
              <span />
              <span />
            </div>

            <div className="mockup-body">
              <div className="m-eyebrow">INNOVEST Registration</div>

              <h3>Tell us about your project</h3>

              <div className="m-field">
                <label>Team/Project Name</label>
                <div className="bar" />
              </div>

              <div className="m-field">
                <label>Current Stage</label>
                <div className="bar" />
              </div>

              <div className="m-tags">
                <span>Idea</span>
                <span>Prototype</span>
                <span>Working Product</span>
                <span>Early Venture</span>
              </div>

              <button
                type="button"
                className="m-submit diven-action-button"
                onClick={() => window.open("#", "_blank")}
              >
                Register Now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          FOOTER
         ================================================= */}

      <footer id="apply">
        <div className="cta-block corners">
          <div className="cta-left">
            <h2>Let's build the next big thing, together.</h2>

            <p>
              Applications close soon — register your project and get ready to showcase your innovation to industry leaders.
            </p>

            <button
              type="button"
              className="apply-btn diven-action-button"
              onClick={() => window.open("#", "_blank")}
            >
              Apply now →
            </button>
"""

pattern = re.compile(r'<section className="process corners" id="process">.*?</button>\n', re.DOTALL)
content = pattern.sub(new_process, content)

with open('src/pages/Index.tsx', 'w') as f:
    f.write(content)
