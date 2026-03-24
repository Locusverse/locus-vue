<script setup lang="ts">
import LandingNav from '../components/LandingNav.vue'
import HeroSection from '../components/HeroSection.vue'
import LogoMarquee from '../components/LogoMarquee.vue'
import BentoFeatures from '../components/BentoFeatures.vue'
import FeatureShowcase from '../components/FeatureShowcase.vue'
import RouteOptimization from '../components/RouteOptimization.vue'
import StatsSection from '../components/StatsSection.vue'
import HowItWorks from '../components/HowItWorks.vue'
import PricingSection from '../components/PricingSection.vue'
import FAQSection from '../components/FAQSection.vue'
import CTASection from '../components/CTASection.vue'
import BackedBy from '../components/BackedBy.vue'
import LandingFooter from '../components/LandingFooter.vue'
import MouseTrailCanvas from '../components/MouseTrailCanvas.vue'
</script>

<template>
  <div class="grain-overlay scroll-smooth text-white selection:bg-primary/30">
    <MouseTrailCanvas />
    <LandingNav />
    <HeroSection />
    <LogoMarquee />
    <BentoFeatures />
    <FeatureShowcase />
    <RouteOptimization />
    <StatsSection />
    <HowItWorks />
    <PricingSection />
    <FAQSection />
    <CTASection />
    <BackedBy />
    <LandingFooter />
  </div>
</template>
