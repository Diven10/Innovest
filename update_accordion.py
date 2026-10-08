import re

with open('src/pages/Index.tsx', 'r') as f:
    content = f.read()

new_accordion = """      <section className="why corners" id="why">
        <div className="why-head" style={{ mixBlendMode: "difference", color: "#fff" }}>
          <h2>Why INNOVEST</h2>
        </div>

        <div className="accordion">
          <div className="acc-item open">
            <button className="acc-trigger" type="button">
              <span className="idx">[01]</span>
              <span className="title">What is INNOVEST?</span>
              <span className="plus">+</span>
            </button>
            <div className="acc-panel">
              <div className="acc-panel-inner">
                INNOVEST is a non-competitive innovation showcase where students can present projects, prototypes, products and early-stage ventures to industry experts, entrepreneurs, investors and regulatory officials.
              </div>
            </div>
          </div>

          <div className="acc-item">
            <button className="acc-trigger" type="button">
              <span className="idx">[02]</span>
              <span className="title">Who can participate?</span>
              <span className="plus">+</span>
            </button>
            <div className="acc-panel">
              <div className="acc-panel-inner">
                Students of Vidyalankar Institute of Technology, Vidyalankar Polytechnic and Vidyalankar School of Information Technology.
              </div>
            </div>
          </div>

          <div className="acc-item">
            <button className="acc-trigger" type="button">
              <span className="idx">[03]</span>
              <span className="title">Is INNOVEST a competition?</span>
              <span className="plus">+</span>
            </button>
            <div className="acc-panel">
              <div className="acc-panel-inner">
                No. There will be no ranking and no winner. The purpose is to connect promising innovations with the right guidance and opportunities.
              </div>
            </div>
          </div>

          <div className="acc-item">
            <button className="acc-trigger" type="button">
              <span className="idx">[04]</span>
              <span className="title">What can I showcase?</span>
              <span className="plus">+</span>
            </button>
            <div className="acc-panel">
              <div className="acc-panel-inner">
                Projects, prototypes, products and early-stage ventures.
              </div>
            </div>
          </div>

          <div className="acc-item">
            <button className="acc-trigger" type="button">
              <span className="idx">[05]</span>
              <span className="title">Do I need a fully working product?</span>
              <span className="plus">+</span>
            </button>
            <div className="acc-panel">
              <div className="acc-panel-inner">
                The showcase is intended for promising innovations at different stages of development. Participants should be able to clearly explain their problem, solution and current development stage.
              </div>
            </div>
          </div>

          <div className="acc-item">
            <button className="acc-trigger" type="button">
              <span className="idx">[06]</span>
              <span className="title">What will experts look at?</span>
              <span className="plus">+</span>
            </button>
            <div className="acc-panel">
              <div className="acc-panel-inner">
                Problem relevance, innovation, prototype/product readiness, real-world potential, team preparedness and the value your project can derive from expert interaction.
              </div>
            </div>
          </div>
        </div>
      </section>"""

pattern = re.compile(r'<section className="why corners" id="why">.*?</section>', re.DOTALL)
new_content = pattern.sub(new_accordion, content)

with open('src/pages/Index.tsx', 'w') as f:
    f.write(new_content)
