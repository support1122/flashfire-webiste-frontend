import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, User, ArrowRight, ChevronLeft, ChevronRight, Pause, Play, Eye } from 'lucide-react';

const EnhancedBlog = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [viewCounts, setViewCounts] = useState({});
  const sectionRef = useRef(null);
  const autoPlayRef = useRef(null);
  
  const postsPerPage = 3;

  // Your blog posts array (keeping the same structure)
  const blogPosts = [
    {
      id: 1,
      title: "How to Write a Resume That Gets Interviews in the U.S. (2025 Job Market Edition)",
      excerpt: "The no-nonsense guide to writing a resume that doesn't just sit in a database — it lands interviews. Learn precision-crafted strategies that make your 6-8 seconds count.",
      author: "Sneha Patel",
      date: "Jan 15, 2025",
      readTime: "12 min",
      category: "Resume Tips",
      image: "https://res.cloudinary.com/drit9nkha/image/upload/v1752811844/image_1_exsbfq.webp",
      categoryColor: "bg-blue-100 text-blue-600",
      views: 1247,
      trending: true,
      content: `
        <p>Welcome to the no-nonsense guide to writing a resume that doesn't just sit in a database — it lands interviews. At <strong><a href="https://www.flashfirejobs.com" target="_blank" rel="noopener noreferrer" style="color: #f97316; text-decoration: underline;">www.flashfirejobs.com</a></strong>, we've helped thousands of job seekers get in front of hiring managers by optimizing every word, metric, and keyword on their resume. In today's high-speed, high-noise U.S. job market, you have 6-8 seconds to make your resume count. Let's make those seconds explosive.</p>

        <h2>1. Start With a Precision-Crafted Summary</h2>
        <p>Skip the generic "hardworking, detail-oriented team player" fluff. Your professional summary should be:</p>
        <ul>
          <li>2-3 lines</li>
          <li>Position-specific</li>
          <li>Impact-driven</li>
        </ul>
        <p><strong>Bad:</strong> Product Manager with 3 years of experience.</p>
        <p><strong>Better:</strong> Product Manager specializing in B2B SaaS, with a track record of driving 25% feature adoption through user-first innovation.</p>
        <p><strong><a href="https://www.flashfirejobs.com" target="_blank" rel="noopener noreferrer" style="color: #f97316; text-decoration: underline;">www.flashfirejobs.com</a></strong> helps you generate high-converting resume summaries aligned to each job post using our proprietary IDRRSA (In-Demand Role Recruitment System Algorithm).</p>

        <h2>2. Write Like a Strategist, Not a Historian</h2>
        <p>Your resume isn't a logbook. It's a pitch.</p>
        <p>Each bullet should:</p>
        <ul>
          <li>Start with a high-voltage verb: "Spearheaded," "Engineered," "Drove"</li>
          <li>Be followed by an outcome, ideally with a number</li>
        </ul>
        <p><strong>Say this:</strong></p>
        <blockquote>Drove 35% increase in sprint velocity by restructuring backlog prioritization, improving Agile cycle time.</blockquote>
        <p><strong>Not this:</strong></p>
        <blockquote>Responsible for sprint planning and task delegation.</blockquote>
        <p><strong><a href="https://www.flashfirejobs.com" target="_blank" rel="noopener noreferrer" style="color: #f97316; text-decoration: underline;">www.flashfirejobs.com</a></strong> gives real-time feedback on weak verbs and missing results.</p>

        <h2>3. Quantify or It Didn't Happen</h2>
        <p>Metrics create credibility. If you're applying for jobs in Product, Data, Marketing, Ops, or Engineering — numbers speak louder than titles.</p>
        <p><strong>Examples that work:</strong></p>
        <ul>
          <li>Increased CTR by 42% through SEO-focused content redesign</li>
          <li>Saved $56K annually by automating reporting workflows</li>
          <li>Led a team of 4 to deliver 5 MVPs in 12 weeks</li>
        </ul>
        <p><strong><a href="https://www.flashfirejobs.com" target="_blank" rel="noopener noreferrer" style="color: #f97316; text-decoration: underline;">www.flashfirejobs.com</a></strong> prompts you to add numbers that recruiters are actively scanning for.</p>

        <h2>4. Tailor for ATS and Humans</h2>
        <p>Over 95% of Fortune 500 companies use Applicant Tracking Systems. If you don't optimize, your resume won't even be seen.</p>
        <p><strong><a href="https://www.flashfirejobs.com" target="_blank" rel="noopener noreferrer" style="color: #f97316; text-decoration: underline;">www.flashfirejobs.com</a></strong> automatically extracts relevant keywords from each job post and integrates them into your resume without keyword stuffing.</p>
        <p><strong>Example:</strong> Instead of writing "Marketing Analyst," our AI may suggest "Performance Marketing Analyst - DTC, Paid Media, Google Analytics" depending on the job.</p>

        <h2>5. Structure and Layout = Readability + Retention</h2>
        <p>According to a 2023 LinkedIn study, resumes that are visually clean and sectioned clearly get 37% more recruiter responses.</p>
        <p><strong><a href="https://www.flashfirejobs.com" target="_blank" rel="noopener noreferrer" style="color: #f97316; text-decoration: underline;">www.flashfirejobs.com</a></strong> templates are ATS-proof and built with recruiter psychology in mind:</p>
        <ul>
          <li>Bold headers</li>
          <li>Adequate white space</li>
          <li>Strategic placement of callout metrics</li>
        </ul>
        <p>Avoid columns, text boxes, or decorative icons. Bots can't read them.</p>

        <h2>6. Emphasize Soft Skills via Outcomes</h2>
        <p>Hiring managers want influence and ownership — not fluff.</p>
        <p><strong>Instead of:</strong> Excellent communication skills</p>
        <p><strong>Say:</strong> Negotiated cross-functional priorities with Engineering, Design, and Sales to align roadmap on $1.2M ARR opportunity.</p>
        <p><strong><a href="https://www.flashfirejobs.com" target="_blank" rel="noopener noreferrer" style="color: #f97316; text-decoration: underline;">www.flashfirejobs.com</a></strong> scans your resume to identify vague phrases and replaces them with real-world business language.</p>

        <h2>7. Leverage Automation Without Losing Personalization</h2>
        <p>You don't need to rewrite your resume 50 times. You need:</p>
        <ul>
          <li>Smart templating</li>
          <li>AI-assisted tailoring</li>
          <li>Instant keyword feedback</li>
        </ul>
        <p><strong><a href="https://www.flashfirejobs.com" target="_blank" rel="noopener noreferrer" style="color: #f97316; text-decoration: underline;">www.flashfirejobs.com</a></strong> does all this. Upload your resume once. Let us personalize it to every job, instantly.</p>

        <h2>Final Word: Stop Blending In</h2>
        <p>Your resume is your pitch deck. It deserves clarity, intensity, and precision.</p>
        <p>Sign up at <strong><a href="https://www.flashfirejobs.com" target="_blank" rel="noopener noreferrer" style="color: #f97316; text-decoration: underline;">www.flashfirejobs.com</a></strong> to:</p>
        <ul>
          <li>Get your resume reviewed and rewritten by pros</li>
          <li>Tailor your resume to every job in 30 seconds</li>
          <li>Bypass ATS filters with built-in keyword scanning</li>
        </ul>
        <p><strong>The future doesn't wait. Neither should your next job.</strong></p>
      `
    },
    {
      id: 2,
      title: "Why Finding a Job in the U.S. as a New Graduate Feels Impossible",
      excerpt: "If you're a recent graduate trying to land your first job in the United States, you're probably overwhelmed and frustrated. Learn why the system isn't built for new grads and how to overcome it.",
      author: "Devansh Pandey",
      date: "Jan 12, 2025",
      readTime: "10 min",
      category: "Job Strategy",
      image: "https://res.cloudinary.com/drit9nkha/image/upload/v1752832446/46d07f8b-261d-49cf-b140-5eaf609b874e_kkjjml.webp",
      categoryColor: "bg-green-100 text-green-600",
      views: 892,
      trending: false,
      content: `
        <p>If you're a recent graduate trying to land your first job in the United States, you're probably overwhelmed, frustrated, and exhausted. You've sent out hundreds of resumes, rewritten your cover letter a dozen times, and refreshed job boards more times than you can count. And yet — silence.</p>

        <p>You're not alone. For international students and recent graduates, finding a job in the U.S. feels nearly impossible. And it's not just a feeling — the data backs it up. Every year, thousands of new grads enter the U.S. job market with high hopes, only to find that the system isn't built for them.</p>

        <h2>The Harsh Reality for New Grads</h2>

        <h3>1. Job Boards Are Overwhelming</h3>
        <p>Popular job boards like Indeed, LinkedIn, and Glassdoor list thousands of roles — and they're great discovery tools. But here's the catch: most of the listings are duplicated across platforms, many are already filled or expired, and almost none are filtered for visa-friendliness.</p>

        <p>That's why <strong><a href="https://www.flashfirejobs.com" target="_blank" rel="noopener noreferrer" style="color: #f97316; text-decoration: underline;">flashfirejobs.com</a></strong> doesn't try to replace these job boards — it leverages them. Our AI actively scrapes fresh listings from multiple platforms and filters them based on your profile, preferences, and visa requirements. Then, we tailor your resume and apply to the best 1000+ jobs on your behalf.</p>

        <p>No manual searching. No wasted time. Just targeted action.</p>

        <h3>2. The "Entry-Level" Paradox</h3>
        <p>Many job listings labeled "entry-level" still require 2–3 years of experience. It's a frustrating paradox that leaves new graduates stuck: you need experience to get a job, but you need a job to get experience.</p>

        <p>At <strong><a href="https://www.flashfirejobs.com" target="_blank" rel="noopener noreferrer" style="color: #f97316; text-decoration: underline;">flashfirejobs.com</a></strong>, we solve this by crafting high-conversion resumes for early-career professionals — showcasing academic projects, internships, certifications, and transferrable skills in a way that appeals to real recruiters.</p>

        <h2>Final Word: Stop Blending In</h2>
        <p>Your resume is your pitch deck. It deserves clarity, intensity, and precision.</p>
        <p>Sign up at <strong><a href="https://www.flashfirejobs.com" target="_blank" rel="noopener noreferrer" style="color: #f97316; text-decoration: underline;">www.flashfirejobs.com</a></strong> to get started today.</p>
      `
    },
    {
      id: 3,
      title: "From 0 to Offer: A Step-by-Step Guide to Landing Your First U.S. Job with Flashfire",
      excerpt: "Graduating in the U.S. as an international student should feel like winning the lottery. But instead of celebration, most students find themselves spiraling into a black hole of ghosted applications and visa anxiety. Here's your complete roadmap from 0 to offer.",
      author: "Radhika Shukla",
      date: "Jan 10, 2025",
      readTime: "15 min",
      category: "Job Strategy",
      image: "https://res.cloudinary.com/drit9nkha/image/upload/v1752832996/freepik__the-style-is-candid-image-photography-with-natural__35759_dnwqka.webp",
      categoryColor: "bg-purple-100 text-purple-600",
      views: 1156,
      trending: true,
      content: `
        <p>Graduating in the U.S. as an international student should feel like winning the lottery. But instead of celebration, most students find themselves spiraling into a black hole of ghosted applications, visa anxiety, and the same dreaded question: "How do I get anyone to notice me?"</p>
        
        <p>This isn't just a guide — it's a reality check and a roadmap. We're not going to tell you to "network more" or "customize your resume" and leave it at that. At <strong><a href="https://www.flashfirejobs.com" target="_blank" rel="noopener noreferrer" style="color: #f97316; text-decoration: underline;">flashfirejobs.com</a></strong>, we've helped hundreds of international students land jobs in record time — not by doing more, but by doing things smarter.</p>
        
        <p>So here it is: your journey from 0 to offer. Let's go.</p>

        <h2>🎯 Step 1: First, Build a Magnetic Profile</h2>
        <p>Before you start applying, imagine this: you're a recruiter with 6 seconds to review a profile. Would you hire you?</p>

        <h3>🔧 Resume Engineering (Not Editing)</h3>
        <p>At <strong><a href="https://www.flashfirejobs.com" target="_blank" rel="noopener noreferrer" style="color: #f97316; text-decoration: underline;">flashfirejobs.com</a></strong>, we don't just "fix typos" — we engineer resumes with:</p>
        <ul>
          <li>Language that mirrors top-performing job descriptions</li>
          <li>Action words that pop to both ATS and recruiters</li>
          <li>Section layouts that are designed for eye tracking</li>
          <li>Role-specific keyword infusion, done using live job market data</li>
        </ul>

        <p>Each resume is rewritten per job, per industry, per goal. Because in 2025, one-size-fits-all is one-size-gets-ignored.</p>

        <h2>🚀 From 0 to Offer: Your Next 6–7 Weeks</h2>
        <p>Here's what your next 45 days could look like:</p>
        <ul>
          <li>✅ <strong>Week 1:</strong> LinkedIn + Resume optimized, preferences set</li>
          <li>✅ <strong>Week 2–3:</strong> First 300–400 jobs applied, dashboard live</li>
          <li>✅ <strong>Week 3–4:</strong> Interviews start, resume iterations improve</li>
          <li>✅ <strong>Week 5–6:</strong> 700+ apps done, 3–6 interviews lined up</li>
          <li>✅ <strong>Week 7:</strong> Offer(s) in hand</li>
        </ul>

        <h2>🌟 Final Word: You Deserve a Fair Shot</h2>
        <p>You've spent years studying. You've taken the risk of coming to the U.S. You've followed every piece of advice you were given.</p>

        <p>Now it's time someone returned the favor — with a tool that actually gets you results.</p>

        <p>Let Flashfire work for you. Let your effort finally pay off.</p>

        <p>👉 Try <strong><a href="https://www.flashfirejobs.com" target="_blank" rel="noopener noreferrer" style="color: #f97316; text-decoration: underline;">flashfirejobs.com</a></strong> today. Your future is waiting.</p>
      `
    },
    {
      id: 4,
      title: "From CPT to H-1B: A Simple Game Plan for Navigating Job Search as an International Student",
      excerpt: "The no-nonsense guide to writing a resume that doesn't just sit in a database — it lands interviews. Learn precision-crafted strategies that make your 6-8 seconds count.",
      author: "Shubham Shukla",
      date: "Jan 5, 2025",
      readTime: "10 min",
      category: "Career Advice",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      categoryColor: "bg-blue-100 text-blue-600",
      views: 743,
      trending: false,
      content: `
        <p>If you're an international student in the U.S., the journey doesn't end at graduation — that's when the real challenge begins. Between CPT, OPT, and the elusive H-1B sponsorship lies a path filled with deadlines, job boards, and uncertainty. <strong><a href="https://www.flashfirejobs.com" target="_blank" rel="noopener noreferrer" style="color: #f97316; text-decoration: underline;">flashfirejobs.com</a></strong> simplifies that path.</p>

        <p>This is your no-fluff guide to turning CPT into a full-time job and maximizing your shot at H-1B — with speed, purpose, and strategy.</p>

        <h2>Step 1: Make CPT Count Beyond the Internship</h2>
        <p>Don't treat CPT like a checkbox. Even if it's unpaid, part-time, or remote — relevance is everything.</p>
        <ul>
          <li>Choose roles in sponsor-friendly sectors: tech, finance, analytics, healthcare</li>
          <li>Build credibility and early U.S. market experience</li>
          <li>Use it as a bridge to strong professional relationships</li>
        </ul>
        <p><strong><a href="https://www.flashfirejobs.com" target="_blank" rel="noopener noreferrer" style="color: #f97316; text-decoration: underline;">flashfirejobs.com</a></strong> helps you find CPT roles that feed directly into H-1B opportunities.</p>

        <h2>Final Thoughts: Build Your Own Momentum</h2>
        <p><strong>flashfirejobs.com</strong> is built for international students — from CPT to H-1B.</p>
        <ul>
          <li>Smart job targeting with real-time sponsor data</li>
          <li>ATS-optimized resumes generated in seconds</li>
          <li>Track interviews, offers, and feedback all in one place</li>
        </ul>
        <p><strong><a href="https://www.flashfirejobs.com" target="_blank" rel="noopener noreferrer" style="color: #f97316; text-decoration: underline;">Start your free trial today</a></strong> and watch the job search flip in your favor.</p>
      `
    },
    {
      id: 5,
      title:"How I Got 10 Offers in 6 Weeks Using Only flashfirejobs.com (Product Manager Edition)",
      excerpt: "Struggling to get interviews as a product manager? I was too — until I found flashfirejobs.com. This blog breaks down exactly how I used it to go from confusion and rejection to multiple offers in just 6 weeks, without referrals or recruiters.",
      author: "Sneha Dingra",
      date: "Jan 1, 2025",
      readTime: "14 min",
      category: "Career Advice",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      categoryColor: "bg-blue-100 text-blue-600",
      views: 1891,
      trending: true,
      content: `
        <p>The U.S. job market isn't easy. Especially if you're an international student.</p>

        <p>It took me months of frustration, rejections, and ghosting before I discovered a way to flip the script. In just 6 weeks, I went from being unsure and overwhelmed — to choosing between <strong>10 product management offers</strong>, all thanks to one tool: <strong>flashfirejobs.com</strong>.</p>

        <p>This isn't a fairytale. It's a system. And in this blog, I'll show you <strong>exactly</strong> how I used flashfirejobs.com to make it happen — step by step, without referrals, insider hookups, or paid recruiters.</p>

        <h2>Week 0: Before flashfirejobs.com — Chaos, Confusion, and Cold Emails</h2>

        <p>Let me paint the picture.</p>

        <p>I was on OPT. My EAD had just arrived. And like every hopeful product manager, I had:</p>

        <ul>
          <li>A decent resume (or so I thought)</li>
          <li>A good LinkedIn profile</li>
          <li>Countless bookmarked roles on LinkedIn, Indeed, and Handshake</li>
        </ul>

        <p>But none of it worked.</p>

        <h2>Week 6: 10 Offers, One Decision</h2>

        <p>By week 6, I had <strong>10 offer letters</strong> in my inbox. No exaggeration.</p>

        <p><strong>7 out of 10</strong> had previously sponsored international hires.</p>

        <p>I chose a mid-sized AI startup in SF. $115K base, H-1B sponsorship confirmed. I went with momentum, growth potential, and sponsorship security.</p>

        <h2>Final Thoughts: No More Guessing, No More Ghosting</h2>

        <p>This system didn't just help me get offers — it gave me back my confidence.</p>

        <p>If you're an international student dreaming of a product manager role in the U.S., you don't need luck. You need a system that works <strong>for</strong> you — while you work on your craft.</p>

        <p><a href="https://www.flashfirejobs.com" target="_blank" class="underline text-primary">Start your own success story. Visit flashfirejobs.com and activate your trial today.</a></p>
      `
    },
    {
      id: 6,
      title: "How to Land Your First Job in the U.S. with Zero Referrals — A Proven Strategy for International Students",
      excerpt: "Landing your first U.S. job as an international student can feel impossible — unless you use the right system. Here's the exact playbook that worked for me.",
      author: "Ira Verma",
      date: "Dec 25, 2024",
      readTime: "16 min",
      category: "Job Search Tips",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      categoryColor: "bg-blue-100 text-blue-600",
      views: 654,
      trending: false,
      content: `
        <p>The U.S. job market can feel like a locked door for international students. You've got the degree, the OPT window ticking, and the pressure to prove yourself fast. But unless you have an insider referral, Ivy League connections, or a visa-friendly employer lined up, landing your first job in the U.S. can feel almost impossible.</p>

        <h2>Referrals help. But systems win.</h2>
        <p>In this blog, I'm breaking down the <strong>exact playbook</strong> that helped me (and hundreds like me) land that crucial <strong>first U.S. offer</strong> — without referrals, connections, or costly recruiters. This is built specifically for F-1 students on OPT, STEM OPT, or recent graduates trying to get their foot in the door.</p>

        <h3>Step 1: Stop Applying Blindly and Start Applying Strategically</h3>
        <p>Most job seekers start by mass-applying to jobs on Indeed or LinkedIn. The result?</p>
        <ul>
          <li>No interview calls</li>
          <li>Endless ghosting</li>
          <li>Wasted energy on companies that don't sponsor</li>
        </ul>

        <h3>Final Thoughts: Your Job Search Isn't Broken. Your System Is.</h3>
        <p>You need:</p>
        <ul>
          <li>High-volume apps</li>
          <li>Custom resumes</li>
          <li>LinkedIn visibility</li>
          <li>Tracking & momentum</li>
        </ul>
        <p><a href="https://www.flashfirejobs.com">flashfirejobs.com</a> delivers it all. You stay interview-ready while the machine works for you.</p>
        <p><strong>No luck needed. Just the right system.</strong></p>
      `
    }
  ];

  const totalPosts = blogPosts.length;
  const maxIndex = Math.max(0, totalPosts - postsPerPage);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isPaused && totalPosts > postsPerPage) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
      }, 4000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, isPaused, maxIndex, totalPosts, postsPerPage]);

  // Simulate view counts
  useEffect(() => {
    const counts = {};
    blogPosts.forEach(post => {
      counts[post.id] = post.views || Math.floor(Math.random() * 2000) + 100;
    });
    setViewCounts(counts);
  }, []);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const visiblePosts = blogPosts.slice(currentIndex, currentIndex + postsPerPage);

  const openBlogPost = (post) => {
    // Get the current origin to properly reference local assets
    const currentOrigin = window.location.origin;
    
    // Create the HTML content with proper favicon references
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${post.title} - FlashFire Blog</title>
        
        <!-- Favicon Links - matching the main site -->
        <link rel="icon" type="image/svg+xml" href="${currentOrigin}/favicon.svg">
        <link rel="alternate icon" href="${currentOrigin}/favicon.ico">
        <link rel="icon" type="image/png" sizes="32x32" href="${currentOrigin}/favicon-32x32.png">
        <link rel="shortcut icon" href="${currentOrigin}/favicon.ico">
        <link rel="apple-touch-icon" href="${currentOrigin}/favicon-32x32.png">
        
        <!-- Meta tags for SEO -->
        <meta name="description" content="${post.excerpt}">
        <meta name="author" content="${post.author}">
        <meta property="og:title" content="${post.title}">
        <meta property="og:description" content="${post.excerpt}">
        <meta property="og:image" content="${post.image}">
        <meta property="og:type" content="article">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${post.title}">
        <meta name="twitter:description" content="${post.excerpt}">
        <meta name="twitter:image" content="${post.image}">
        
        <!-- Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4P890VGD8D"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-4P890VGD8D');
        </script>
        
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6;
          }
          .content h2 { 
            font-size: 1.875rem; 
            font-weight: bold; 
            margin: 2rem 0 1rem 0; 
            color: #1f2937;
            border-bottom: 3px solid #f97316;
            padding-bottom: 0.5rem;
          }
          .content h3 { 
            font-size: 1.25rem; 
            font-weight: 600; 
            margin: 1.25rem 0 0.5rem 0; 
            color: #374151; 
          }
          .content p { 
            margin: 0.5rem 0; 
            line-height: 1.75; 
            color: #4b5563; 
            font-size: 0.95rem;
          }
          .content ul { 
            margin: 1rem 0; 
            padding-left: 1.5rem; 
          }
          .content li { 
            margin: 0.5rem 0; 
            color: #4b5563; 
            font-size: 0.9rem;
            line-height: 1.6;
          }
          .content blockquote { 
            margin: 1rem 0; 
            padding: 1rem; 
            background: #f9fafb; 
            border-left: 4px solid #f97316; 
            font-style: italic;
            border-radius: 0.375rem;
            font-size: 0.9rem;
          }
          .content strong { 
            color: #1f2937; 
            font-weight: 600; 
          }
          .content a { 
            color: #f97316; 
            text-decoration: underline;
            transition: color 0.2s ease;
          }
          .content a:hover { 
            color: #ea580c; 
          }
          .back-btn {
            background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
            transition: all 0.3s ease;
          }
          .back-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(249, 115, 22, 0.4);
          }
        </style>
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 py-8">
          <!-- Header -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <img src="${post.image}" alt="${post.title}" class="w-full h-auto max-h-[600px] object-contain mx-auto rounded-t-lg" />
            <div class="p-8">
              <div class="flex items-center mb-4">
                <span class="px-3 py-1 rounded-full text-sm font-medium ${post.categoryColor}">
                  ${post.category}
                </span>
              </div>
              <h1 class="text-4xl font-bold text-gray-900 mb-4">${post.title}</h1>
              <div class="flex items-center text-gray-600 space-x-6">
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                  </svg>
                  ${post.date}
                </div>
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                  </svg>
                  ${post.readTime}
                </div>
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                  </svg>
                  ${post.author}
                </div>
              </div>
            </div>
          </div>
          
          <!-- Content -->
          <div class="bg-white rounded-lg shadow-lg p-8">
            <div class="content prose max-w-none">
              ${post.content}
            </div>
          </div>
          
          <!-- Back Button -->
          <div class="mt-8 text-center">
            <button onclick="window.close()" class="back-btn text-white px-8 py-3 rounded-full font-semibold shadow-lg">
              Close Article
            </button>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // Create a blob URL for the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const blobUrl = URL.createObjectURL(blob);
    
    // Open the new window with the blob URL
    const newWindow = window.open(blobUrl, '_blank');
    
    // Clean up the blob URL after a short delay
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
  };

  return (
    <section 
      ref={sectionRef}
      id="blog" 
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-600 rounded-full font-medium text-sm mb-6 transform hover:scale-105 transition-transform duration-300 shadow-lg">
            <Calendar className="w-4 h-4 mr-2 animate-bounce" />
            Career Insights & Expert Tips
          </div>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-orange-600 to-gray-900 bg-clip-text text-transparent mb-6 leading-tight">
            Expert Job Search Tips & Career Advice
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay ahead with proven strategies, AI automation insights, and career growth
            tips from industry experts.
          </p>
          
          {/* Auto-play Controls */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <button
              onClick={toggleAutoPlay}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-gray-600 hover:text-orange-600"
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="text-sm font-medium">
                {isAutoPlaying ? 'Pause' : 'Play'} Auto-scroll
              </span>
            </button>
          </div>
        </div>

        {/* Enhanced Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows with improved design */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 bg-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-orange-50 group border border-gray-100"
            aria-label="Previous articles"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-orange-600 transition-colors duration-300" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 bg-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-orange-50 group border border-gray-100"
            aria-label="Next articles"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-orange-600 transition-colors duration-300" />
          </button>

          {/* Blog Grid with Enhanced Cards */}
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ease-in-out"
              style={{ 
                transform: `translateX(0)`,
                opacity: 1
              }}
            >
              {visiblePosts.map((post, index) => (
                <article
                  key={post.id}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer transform hover:-translate-y-3 hover:rotate-1 relative"
                  onClick={() => openBlogPost(post)}
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animation: isVisible ? 'slideInUp 0.8s ease-out forwards' : 'none'
                  }}
                >
                  {/* Enhanced Image with Overlay Effects */}
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Category badge with glow effect */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${post.categoryColor} shadow-lg backdrop-blur-sm`}>
                        {post.category}
                      </span>
                    </div>
                    
                    {/* Trending badge */}
                    {post.trending && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-bold animate-pulse">
                          🔥 TRENDING
                        </span>
                      </div>
                    )}

                    {/* View count overlay */}
                    <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {(viewCounts[post.id] || 0).toLocaleString()}
                    </div>
                  </div>

                  {/* Enhanced Content */}
                  <div className="p-8">
                    {/* Meta Info with icons */}
                    <div className="flex items-center text-sm text-gray-500 mb-4 space-x-6">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Enhanced Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2 leading-tight">
                      {post.title}
                    </h3>

                    {/* Excerpt with gradient fade */}
                    <div className="relative mb-6">
                      <p className="text-gray-600 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent"></div>
                    </div>

                    {/* Enhanced Author & Read More */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm text-gray-700 font-semibold">{post.author}</span>
                      </div>
                      <div className="flex items-center text-orange-600 font-semibold text-sm group-hover:text-orange-700 transition-colors duration-200">
                        <span className="mr-2">Read More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </article>
              ))}
            </div>
          </div>

          {/* Enhanced Progress Bar */}
          <div className="mt-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-200 rounded-full h-2 w-64">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / (maxIndex + 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Enhanced Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === index 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 w-12 h-3 shadow-lg' 
                    : 'bg-gray-300 hover:bg-gray-400 w-3 h-3 hover:scale-125'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-500 font-medium">
              {currentIndex + 1} of {maxIndex + 1}
            </span>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
            View All Articles
            <ArrowRight className="w-5 h-5 ml-2" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(60px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default EnhancedBlog;
