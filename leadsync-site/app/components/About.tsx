export default function About() {
  return (
    <section id="about" className="section about on-light" aria-labelledby="about-title">
      <div className="wrap">
        <p className="eyebrow">
          <span className="eyebrow__idx">01</span>
          <span>About</span>
        </p>

        <div className="about__grid">
          <div>
            <h2 id="about-title" className="h2 about__name">
              Malek <span className="serif">Abdelrahman</span>
            </h2>
            <p className="about__role">Founder · LeadSync</p>
          </div>

          <div>
            <p className="about__body">
              I started LeadSync to help businesses use AI where it genuinely improves operations,
              instead of selling them another platform to manage. My background is in engineering.
              I find the practical problems worth solving, then design and implement systems that
              connect with the tools a business already uses. LeadSync is early-stage, and I’m
              building a working WhatsApp lead-qualification prototype.
            </p>
            <dl className="facts">
              <div>
                <dt>Stage</dt>
                <dd>Early-stage consultancy, taking on a small number of projects</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd className="areas">
                  <span>Customer handling</span>
                  <span>Internal processes</span>
                  <span>Tool integration</span>
                </dd>
              </div>
              <div>
                <dt>Approach</dt>
                <dd>Each project is scoped in writing before work begins</dd>
              </div>
              <div>
                <dt>Elsewhere</dt>
                <dd>
                  <a
                    href="https://www.linkedin.com/in/malek-abdelrahmanma/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
