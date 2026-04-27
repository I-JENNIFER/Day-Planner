import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started
          </Link>
          <Link
            className="button button--secondary button--lg"
            href="https://day-planner-olive.vercel.app"
            style={{marginLeft: '1rem'}}>
            Live Demo
          </Link>
        </div>
      </div>
    </header>
  );
}

function Feature({title, description}: {title: string; description: string}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md padding-vert--lg">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

function HomepageFeatures() {
  return (
    <section style={{padding: '2rem 0'}}>
      <div className="container">
        <div className="row">
          <Feature
            title="Smart Scheduling"
            description="Separate routines for Office, Remote, and Weekend days. DayFlow adapts to your lifestyle with customizable daily schedules."
          />
          <Feature
            title="Progress Tracking"
            description="Check off activities throughout the day. See your daily completion percentage, weekly analytics, and 7-day trends at a glance."
          />
          <Feature
            title="Calendar Export"
            description="Export your daily schedule as a standard .ics file compatible with Google Calendar, Apple Calendar, and Outlook."
          />
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="Documentation for DayFlow — a smart daily planner with routine scheduling, progress tracking, and calendar export.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
