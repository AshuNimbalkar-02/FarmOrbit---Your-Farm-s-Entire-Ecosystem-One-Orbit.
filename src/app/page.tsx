import Link from 'next/link';
import styles from './page.module.css';
import { ScanSearch, TrendingUp, Sprout, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="home">
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Grow Smarter. Harvest More.</h1>
          <p className={styles.subtitle}>
            Your AI-Powered Farm Guide. Instant crop analysis, real-time market insights, and personalized growth strategies.
          </p>
          <div className={styles.heroButtons}>
            <Link href="/advisory" className={styles.primaryBtn}>
              <ScanSearch size={20} />
              Analyze Crop (AI)
            </Link>
            <Link href="/market" className={styles.secondaryBtn}>
              <TrendingUp size={20} />
              Check Market Prices
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why Choose SmartCrop?</h2>
          <p style={{ color: 'var(--muted-foreground)' }}>Empowering farmers with cutting-edge technology.</p>
        </div>

        <div className={styles.featuresGrid}>
          <Link href="/advisory?tool=crop-doctor" className={styles.featureCard}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', width: 'fit-content', padding: '1rem', borderRadius: '50%' }}>
              <ScanSearch size={32} color="var(--primary)" />
            </div>
            <h3>Instant Diagnosis</h3>
            <p>Upload a photo or record audio of your crop&#39;s condition. Our AI detects pests and diseases instantly with 95% + accuracy.</p>
          </Link>

          <Link href="/market" className={styles.featureCard}>
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', width: 'fit-content', padding: '1rem', borderRadius: '50%' }}>
              <TrendingUp size={32} color="#3b82f6" />
            </div>
            <h3>Market Intelligence</h3>
            <p>Get real-time prices from local mandis. Track 7-day and 30-day price trends to maximize your profits.</p>
          </Link>

          <Link href="/advisory?tool=fertilizer" className={styles.featureCard}>
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', width: 'fit-content', padding: '1rem', borderRadius: '50%' }}>
              <Sprout size={32} color="#f59e0b" />
            </div>
            <h3>Soil & Fertilizer</h3>
            <p>Personalized NPK recommendations based on your soil health card. Reduce costs and improve soil longevity.</p>
          </Link>
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Link href="/#get-started" style={{ color: 'var(--primary)', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Get Started Now <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
