import { useEffect } from 'react';

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSc-nlL0BXIZhPf6f8DVCSsfgmlVU_Zpq5AQUgF3YnPmVAMoJw/viewform';
import { Link } from 'react-router-dom';
import { useReveal } from '../lib/useReveal';
import SectionHeading from '../components/SectionHeading';
import Seal from '../components/Seal';
import CartoonButton from '../components/ui/CartoonButton';

const STEPS = [
  {
    n: '01',
    title: 'Claim your school',
    body: 'Fill in the entry form with your school and the account that will be posting, then follow @hacky_nation. First account to claim a school gets it. No sack account for your school yet? Start one — that counts.',
  },
  {
    n: '02',
    title: 'Post a clip a week',
    body: 'Get a circle together, film it, post it on your school’s account and tag us. Any sack works. A rolled-up sock works. Put your school name on screen for ten seconds so we can count heads.',
  },
  {
    n: '03',
    title: 'Watch the board',
    body: 'We score every clip and publish full standings — every school, every week — on Tuesdays. The gap between you and first place is public all season.',
  },
];

const SCORING = [
  { line: 'Clip posted for the week', note: 'Valid clip, school named on screen, tagged', pts: '10', cap: 'Once a week' },
  { line: 'Every player in the circle', note: 'Counted off the footage, so keep the headcount visible', pts: '2 each', cap: 'Max 40' },
  { line: 'A face that was not in last week’s clip', note: 'Rewards recruiting over filming the same six friends', pts: '5 each', cap: 'Max 25' },
  { line: 'Clip of the Week', note: 'Best clip on the internet that week', pts: '10', cap: 'One school' },
  { line: 'Most Viewed', note: 'Whichever clip travelled furthest', pts: '10', cap: 'One school' },
  { line: 'The Shank Award', note: 'Worst clip of the week. Deliberately worth the same as the best', pts: '10', cap: 'One school' },
  { line: 'Teacher, coach or principal in the circle', note: 'The single most shareable clip there is', pts: '15', cap: 'Once a week' },
];

const AWARDS = [
  { title: 'Clip of the Week', prize: 'A free sack, winner’s pick', accent: 'text-blue' },
  { title: 'Most Viewed', prize: 'A $10 gift card', accent: 'text-yellow-deep' },
  { title: 'The Shank Award', prize: 'A free tee', accent: 'text-red' },
];

const DATES = [
  { when: 'Now — Aug 31', what: 'Entries open', body: 'Claim your school. The board fills up publicly as schools join.' },
  { when: 'Sep 1 — 13', what: 'Opening stretch', body: 'Two weeks for the first clip, because districts open on dates two weeks apart. Nobody loses for starting late.' },
  { when: 'Sep 14 — Oct 4', what: 'The season', body: 'Clips due Sunday midnight. Standings, awards and the pot total posted every Tuesday.' },
  { when: 'Oct 6', what: 'Champion crowned', body: 'Final standings. The winning school picks colours and sends us a logo.' },
];

export default function TournamentPage() {
  useReveal(['tournament']);

  useEffect(() => {
    window.scrollTo(0, 0);
    const previous = document.title;
    document.title = 'Sack to School — the tournament | Hacky Nation';
    return () => { document.title = previous; };
  }, []);

  return (
    <main className="paper-grain relative bg-paper">
      <div className="relative z-10 mx-auto max-w-site px-5 py-10 md:px-8 md:py-14">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 label text-ink-faint">
            <li><Link to="/" className="transition-colors hover:text-blue">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-ink">Tournament</li>
          </ol>
        </nav>

        {/* ---------- the pitch ---------- */}
        <header className="reveal relative">
          <p className="eyebrow">Entries open · closes Aug 31</p>
          <h1 className="mt-3 max-w-4xl font-display text-display-hero text-ink">
            Sack to School
          </h1>
          <p className="mt-6 max-w-2xl font-body text-body-lg text-ink-soft">
            Your school against every school in the country. Post one clip a week of your crew
            kicking a sack around, and the school that gets the most people into the circle wins
            25 custom sacks in its own colours — plus a cash pot that grows every time we sell
            anything.
          </p>
          <p className="mt-4 max-w-2xl font-body text-body-lg text-ink">
            Points come from how many people you get outside, not how good anybody is. Twenty
            beginners beat one pro. Every time.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CartoonButton href={FORM_URL} target="_blank" label="Enter your school" color="bg-blue" />
            <CartoonButton
              href="https://www.instagram.com/hacky_nation"
              target="_blank"
              label="Follow @hacky_nation"
              color="bg-paper"
              textClass="text-ink"
            />
          </div>
        </header>

        {/* ---------- how it works ---------- */}
        <section aria-labelledby="how-heading" className="mt-16 md:mt-24">
          <SectionHeading index="01" kicker="Three steps" title="How it works" id="how-heading" mis="blue" />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {STEPS.map((step) => (
              <article key={step.n} className="reveal card flex flex-col gap-3 p-6">
                <p className="font-display text-display-md text-blue">{step.n}</p>
                <h3 className="font-display text-display-sm text-ink">{step.title}</h3>
                <p className="font-body text-body-sm text-ink-soft">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- prizes ---------- */}
        <section aria-labelledby="prize-heading" className="mt-16 md:mt-24">
          <SectionHeading
            index="02"
            kicker="What the winning school takes"
            title="The grand prize"
            id="prize-heading"
            mis="red"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="reveal card relative flex flex-col gap-4 bg-ink p-8 text-paper">
              <p className="eyebrow text-yellow">Grand prize</p>
              <h3 className="font-display text-display-lg text-paper">25 custom sacks</h3>
              <p className="font-body text-body-md text-paper/80">
                Your school colours, your logo, stitched into a run of 25 that exists nowhere else
                on earth. A gift card is a gift card anywhere. This only exists at one school.
              </p>
              <Seal
                variant="red"
                burst
                size="sm"
                lines={['ONE', 'SCHOOL']}
                className="absolute -right-3 -top-3 rotate-[12deg]"
              />
            </article>

            <article className="reveal card flex flex-col gap-4 bg-yellow p-8">
              <p className="eyebrow text-ink">Plus the pot</p>
              <h3 className="flex items-baseline gap-3 font-display text-display-lg text-ink">
                <span className="font-numeric text-[3.2rem] leading-none">10%</span>
                <span>of every order</span>
              </h3>
              <p className="font-body text-body-md text-ink/80">
                Ten percent of everything Hacky Nation sells while the tournament runs goes into a
                cash pot for the winning school. Every order makes it bigger. We post the running
                total every Tuesday next to the standings.
              </p>
              <p className="label text-ink">
                Nobody has to buy anything to enter or win — it only decides how big the pot gets.
              </p>
            </article>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {AWARDS.map((award) => (
              <article key={award.title} className="reveal card flex flex-col gap-2 p-6">
                <p className="label text-ink-faint">Every week</p>
                <h3 className={`font-display text-display-sm ${award.accent}`}>{award.title}</h3>
                <p className="font-body text-body-sm text-ink-soft">{award.prize}</p>
                <p className="mt-2 font-numeric text-[1.4rem] text-ink">10 pts</p>
              </article>
            ))}
          </div>

          <p className="mt-6 border-2 border-ink bg-paper-deep px-5 py-4 font-body text-body-sm text-ink-soft">
            All three weekly awards are worth the same ten points. The best clip on the internet and
            the ugliest whiff on the internet score identically, and that is the point — you do not
            have to be good at this to win something.
          </p>
        </section>

        {/* ---------- scoring ---------- */}
        <section aria-labelledby="scoring-heading" className="mt-16 md:mt-24">
          <SectionHeading
            index="03"
            kicker="Built so showing up beats being good"
            title="Scoring"
            id="scoring-heading"
            mis="yellow"
            aside="A school with twenty mediocre players outscores a school with one great one."
          />

          <div className="reveal mt-10 overflow-x-auto border-2 border-ink bg-paper">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-ink bg-paper-deep">
                  <th scope="col" className="px-5 py-3 label text-ink-soft">Scoring line</th>
                  <th scope="col" className="px-5 py-3 label text-ink-soft">Points</th>
                  <th scope="col" className="px-5 py-3 label text-ink-soft">Cap</th>
                </tr>
              </thead>
              <tbody>
                {SCORING.map((row) => (
                  <tr key={row.line} className="border-b border-paper-edge last:border-b-0">
                    <td className="px-5 py-4">
                      <p className="font-body text-body-md text-ink">{row.line}</p>
                      <p className="mt-0.5 font-body text-body-sm text-ink-faint">{row.note}</p>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 font-numeric text-[1.15rem] text-blue">
                      {row.pts}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 label text-ink-soft">{row.cap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ---------- calendar ---------- */}
        <section aria-labelledby="dates-heading" className="mt-16 md:mt-24">
          <SectionHeading index="04" kicker="Key dates" title="The calendar" id="dates-heading" mis="blue" />

          <div className="mt-10 flex flex-col">
            {DATES.map((d) => (
              <div key={d.when} className="reveal rule flex flex-col gap-2 py-6 md:flex-row md:gap-10">
                <div className="md:w-56 md:shrink-0">
                  <p className="eyebrow">{d.when}</p>
                  <p className="mt-2 font-display text-display-sm text-ink">{d.what}</p>
                </div>
                <p className="max-w-2xl font-body text-body-md text-ink-soft">{d.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- rules ---------- */}
        <section aria-labelledby="rules-heading" className="mt-16 md:mt-24">
          <SectionHeading index="05" kicker="The boring but necessary part" title="The rules" id="rules-heading" mis="red" />

          <ul className="reveal mt-10 grid gap-x-10 gap-y-4 md:grid-cols-2">
            {[
              'Free to enter. No purchase is necessary to enter or to win, and buying something cannot earn your school a single point.',
              'One clip per school scores each week. Post five if you like — your best one counts, so a school with a film club cannot bury everyone else.',
              'Your school name has to be on screen for ten seconds so we can verify the headcount off the footage.',
              'Post on your school’s sack account, tag @hacky_nation, and use #SackToSchool so we can find it.',
              'Entering means we can repost your clips on our accounts and in the weekly standings.',
              'Everyone in your clips needs to be okay with being filmed and posted. That part is on you.',
              'Ties are broken by the most unique players across the whole season. Still tied, and both schools post one final clip for a public vote.',
              'Late schools can join after Aug 31 — they just forfeit any points already scored. We will never turn a school away.',
            ].map((rule) => (
              <li key={rule} className="flex gap-3 border-t-2 border-ink pt-4">
                <span aria-hidden="true" className="mt-2 h-2.5 w-2.5 shrink-0 bg-blue" />
                <span className="font-body text-body-sm text-ink-soft">{rule}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- close ---------- */}
        <section className="reveal mt-16 border-2 border-ink bg-blue px-6 py-10 text-center shadow-press md:mt-24 md:px-10 md:py-14">
          <h2 className="font-display text-display-xl text-paper">Is your school in</h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-body-lg text-paper/85">
            One form, two minutes, and your school is on the board. We will send you everything else.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CartoonButton href={FORM_URL} target="_blank" label="Enter your school" color="bg-paper" textClass="text-ink" />
            <CartoonButton to="/shop" label="Grow the pot" color="bg-ink" />
          </div>
        </section>
      </div>
    </main>
  );
}
