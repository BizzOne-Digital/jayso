import mongoose from 'mongoose'
import argon2 from 'argon2'
import { connectDB } from '../src/lib/db/mongoose'
import AdminUser from '../src/lib/models/AdminUser'
import SiteSettings from '../src/lib/models/SiteSettings'
import Integration from '../src/lib/models/Integration'
import Service from '../src/lib/models/Service'
import Market from '../src/lib/models/Market'
import Offer from '../src/lib/models/Offer'
import FAQ from '../src/lib/models/FAQ'
import Resource from '../src/lib/models/Resource'
import Product from '../src/lib/models/Product'
import Testimonial from '../src/lib/models/Testimonial'

async function seed() {
  try {
    console.log('🌱 Starting database seed...')
    
    await connectDB()

    // Clear existing data
    console.log('🧹 Clearing existing data...')
    await Promise.all([
      AdminUser.deleteMany({}),
      SiteSettings.deleteMany({}),
      Integration.deleteMany({}),
      Service.deleteMany({}),
      Market.deleteMany({}),
      Offer.deleteMany({}),
      FAQ.deleteMany({}),
      Resource.deleteMany({}),
      Product.deleteMany({}),
      Testimonial.deleteMany({}),
    ])

    // Create Admin User
    console.log('👤 Creating admin user...')
    const hashedPassword = await argon2.hash('Admin@123')
    await AdminUser.create({
      email: 'admin@profilegroups.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
      isActive: true,
    })

    // Create Site Settings
    console.log('⚙️ Creating site settings...')
    await SiteSettings.create({
      brandName: 'Profile Environmental Support Services',
      logoUrl: '/logo.png',
      primaryEmail: 'info@environmentalservices.ca',
      primaryPhone: '1-800-251-0034',
      alternateEmail: 'info@profilegroups.com',
      alternatePhone: '647-703-2900',
      confirmationNeeded: true,
      whatsappNumber: '18002510034',
      facebookUrl: 'https://www.facebook.com/profile.php?id=100063455592689',
      footerDescription: 'Providing comprehensive environmental support services including commercial cleaning, infection prevention, sustainability solutions, and staff training for facilities across multiple industries.',
      metaTitle: 'Profile Environmental Support Services - Commercial Cleaning & Infection Prevention',
      metaDescription: 'Commercial cleaning, infection-prevention, sustainability and staff-support solutions designed around your facility.',
      showPricing: false,
      enableCheckout: false,
    })

    // Create Integration Settings
    console.log('🔌 Creating integration settings...')
    await Integration.create({
      jotformCalculatorUrl: 'https://form.jotform.com/242406303717248',
      jotformBookingUrl: 'https://www.jotform.com/242300808333245',
      jotformEmbedMode: 'iframe',
      whatsappMessageTemplate: 'Hello! I would like to know more about your cleaning services.',
      enableCheckout: false,
    })

    // Create Services
    console.log('🛠️ Creating services...')
    const services = await Service.insertMany([
      {
        title: 'Infection Prevention Control',
        slug: 'infection-prevention-control',
        excerpt: 'Advanced cleaning protocols designed to minimize pathogen transmission and protect facility occupants.',
        description: '<p>Our Infection Prevention Control services implement evidence-based cleaning protocols specifically designed for healthcare and high-risk environments. We focus on reducing pathogen transmission through specialized techniques, EPA-registered disinfectants, and rigorous quality control.</p><p>This service is essential for medical facilities, long-term care homes, dental offices, and any environment where infection control is critical.</p>',
        challenge: 'Healthcare-associated infections cost billions annually. Facilities need reliable, compliant cleaning that actually reduces transmission risks.',
        approach: 'We combine specialized training, hospital-grade disinfectants, touch-point focus, verification systems, and continuous quality monitoring.',
        scope: [
          'EPA-registered hospital-grade disinfectants',
          'High-touch surface focus',
          'Terminal cleaning protocols',
          'Staff infection control training',
          'Quality verification systems',
        ],
        benefits: [
          'Reduced infection transmission',
          'Regulatory compliance support',
          'Staff and patient safety',
          'Documentation and tracking',
        ],
        process: [
          'Facility assessment and risk analysis',
          'Customized protocol development',
          'Staff training and certification',
          'Implementation and monitoring',
          'Continuous improvement',
        ],
        order: 1,
        status: 'published',
      },
      {
        title: 'Sustainability',
        slug: 'sustainability',
        excerpt: 'Eco-conscious cleaning solutions that reduce environmental impact while maintaining exceptional results.',
        description: '<p>Our Sustainability service delivers environmentally responsible cleaning without compromising effectiveness. We use Green Seal certified products, reduce waste, optimize resource use, and help facilities meet sustainability goals.</p><p>Perfect for organizations committed to environmental stewardship and corporate social responsibility.</p>',
        challenge: 'Organizations want to reduce their environmental footprint, but worry that green cleaning means reduced effectiveness.',
        approach: 'We prove that sustainable practices and superior cleaning outcomes go hand-in-hand through smart product selection, waste reduction, and resource optimization.',
        scope: [
          'Green Seal certified cleaning products',
          'Microfiber and reusable systems',
          'Waste reduction programs',
          'Energy-efficient equipment',
          'Water conservation practices',
        ],
        benefits: [
          'Reduced environmental impact',
          'Healthier indoor air quality',
          'Cost savings over time',
          'Enhanced corporate reputation',
        ],
        process: [
          'Sustainability audit',
          'Green product transition',
          'Staff eco-training',
          'Implementation and tracking',
          'Reporting and improvement',
        ],
        order: 2,
        status: 'published',
      },
      {
        title: 'Steam Cleaning',
        slug: 'steam-cleaning',
        excerpt: 'Chemical-free deep cleaning using high-temperature steam for superior sanitation and safety.',
        description: '<p>Steam Cleaning harnesses the power of superheated steam to sanitize surfaces without chemicals. This method is ideal for sensitive environments, food service areas, and facilities seeking chemical-free solutions.</p><p>Steam cleaning kills bacteria, viruses, and allergens while being completely safe for occupants and the environment.</p>',
        challenge: 'Chemical residues can trigger allergies, contaminate food areas, and create health concerns. Facilities need effective alternatives.',
        approach: 'We use commercial-grade steam equipment that reaches temperatures sufficient to kill pathogens without any chemical additives.',
        scope: [
          'High-temperature steam systems',
          'Hard surface sanitization',
          'Grout and tile restoration',
          'Equipment and fixture cleaning',
          'Allergen reduction',
        ],
        benefits: [
          'Zero chemical residue',
          'Kills 99.9% of pathogens',
          'Safe for food service areas',
          'Environmentally friendly',
        ],
        process: [
          'Surface assessment',
          'Equipment selection',
          'Steam application',
          'Quality verification',
          'Scheduled maintenance',
        ],
        order: 3,
        status: 'published',
      },
      {
        title: 'Green Cleaning',
        slug: 'green-cleaning',
        excerpt: 'Certified environmentally-friendly cleaning programs that protect both people and planet.',
        description: '<p>Green Cleaning goes beyond traditional methods by using certified eco-friendly products and sustainable practices throughout our entire service delivery. We focus on reducing toxic exposure while maintaining the highest cleaning standards.</p><p>This service is ideal for schools, offices, and organizations prioritizing occupant health and environmental responsibility.</p>',
        challenge: 'Traditional cleaning products can contain harmful chemicals that affect indoor air quality and occupant health.',
        approach: 'We exclusively use third-party certified green products, implement sustainable practices, and train staff in environmentally responsible techniques.',
        scope: [
          'Green Seal and EcoLogo certified products',
          'Low-VOC formulations',
          'Sustainable equipment and supplies',
          'Indoor air quality optimization',
          'Waste minimization programs',
        ],
        benefits: [
          'Improved indoor air quality',
          'Reduced chemical exposure',
          'Environmental protection',
          'Support for green building certifications',
        ],
        process: [
          'Green product audit',
          'Certification verification',
          'Implementation planning',
          'Staff training',
          'Ongoing monitoring',
        ],
        order: 4,
        status: 'published',
      },
    ])

    // Create Markets
    console.log('🏢 Creating markets...')
    const markets = await Market.insertMany([
      {
        title: 'Office Buildings & Corporate Offices',
        slug: 'office-buildings',
        excerpt: 'Professional cleaning solutions for corporate environments that enhance productivity and impress clients.',
        description: '<p>We understand that office environments directly impact employee productivity, client impressions, and overall business success. Our corporate cleaning services maintain professional spaces that support your business objectives.</p>',
        challenges: [
          'High-traffic areas require frequent attention',
          'First impressions matter for client visits',
          'Employee health impacts productivity',
          'After-hours access coordination',
        ],
        approach: 'Flexible scheduling, consistent quality, professional appearance, and minimal disruption to business operations.',
        solutions: [
          'Daily janitorial services',
          'Executive office cleaning',
          'Conference room preparation',
          'Kitchen and breakroom sanitation',
          'Restroom excellence',
          'Floor care programs',
        ],
        order: 1,
        status: 'published',
      },
      {
        title: 'Medical & Healthcare Facilities',
        slug: 'healthcare-facilities',
        excerpt: 'Specialized infection-control cleaning for medical environments where safety is paramount.',
        description: '<p>Healthcare facilities demand the highest cleaning standards. We provide specialized infection prevention protocols, trained staff, and rigorous quality control to protect patients, staff, and visitors.</p>',
        challenges: [
          'Infection transmission risks',
          'Regulatory compliance requirements',
          'Vulnerable patient populations',
          'Critical 24/7 operations',
        ],
        approach: 'Hospital-grade protocols, certified staff, EPA-registered disinfectants, and continuous quality monitoring.',
        solutions: [
          'Infection prevention protocols',
          'Terminal room cleaning',
          'High-touch surface focus',
          'Medical equipment cleaning',
          'Biohazard handling',
          'Compliance documentation',
        ],
        order: 2,
        status: 'published',
      },
      {
        title: 'Retail & Commercial Stores',
        slug: 'retail-commercial',
        excerpt: 'Maintain welcoming, spotless retail environments that enhance the customer experience.',
        description: '<p>Retail success depends on customer experience. Clean, well-maintained stores encourage longer visits and return business. We provide flexible scheduling and detailed cleaning that keeps your space inviting.</p>',
        challenges: [
          'High customer traffic and quick turnaround',
          'Customer perception directly affects sales',
          'Varied surfaces and displays',
          'Extended operating hours',
        ],
        approach: 'Off-hours scheduling, rapid response capability, and attention to customer-facing areas.',
        solutions: [
          'Floor care and maintenance',
          'Window and glass cleaning',
          'Fitting room sanitation',
          'Shopping cart/basket cleaning',
          'Restroom excellence',
          'Display and shelf cleaning',
        ],
        order: 3,
        status: 'published',
      },
      {
        title: 'Industrial & Warehousing',
        slug: 'industrial-warehousing',
        excerpt: 'Heavy-duty cleaning solutions for industrial facilities and distribution centers.',
        description: '<p>Industrial facilities face unique cleaning challenges. We provide specialized equipment, trained staff, and safety-focused protocols for warehouses, manufacturing plants, and distribution centers.</p>',
        challenges: [
          'Large square footage',
          'Heavy machinery and equipment',
          'Safety regulations and compliance',
          'Dust, debris, and industrial residue',
        ],
        approach: 'Industrial-grade equipment, safety-trained staff, and customized protocols for challenging environments.',
        solutions: [
          'Floor scrubbing and maintenance',
          'High-bay cleaning',
          'Equipment and machinery cleaning',
          'Warehouse office areas',
          'Loading dock cleaning',
          'Safety and compliance support',
        ],
        order: 4,
        status: 'published',
      },
      {
        title: 'Property Management Companies',
        slug: 'property-management',
        excerpt: 'Comprehensive cleaning programs for multi-tenant buildings and managed properties.',
        description: '<p>Property managers need reliable cleaning partners who understand tenant satisfaction, building maintenance, and consistent service delivery across multiple locations.</p>',
        challenges: [
          'Multiple buildings and locations',
          'Tenant satisfaction and retention',
          'Common area maintenance',
          'Budget management',
        ],
        approach: 'Centralized account management, consistent standards across locations, and responsive communication.',
        solutions: [
          'Common area cleaning',
          'Lobby and elevator maintenance',
          'Parking garage cleaning',
          'Amenity space care',
          'Move-in/move-out cleaning',
          'Special project support',
        ],
        order: 5,
        status: 'published',
      },
      {
        title: 'Hospitality',
        slug: 'hospitality',
        excerpt: 'Exceptional cleaning standards for hotels, event venues, and hospitality spaces.',
        description: '<p>Guest experience depends on immaculate cleanliness. We provide hospitality-focused cleaning that meets and exceeds guest expectations while supporting operational efficiency.</p>',
        challenges: [
          'Guest satisfaction is critical',
          'High turnover and quick turnaround',
          'Variable occupancy demands',
          'Public health expectations',
        ],
        approach: 'Guest-focused service, flexible staffing, attention to detail, and hospitality industry expertise.',
        solutions: [
          'Guest room cleaning',
          'Event space preparation',
          'Banquet hall cleaning',
          'Public area maintenance',
          'Kitchen and food service support',
          'Laundry coordination',
        ],
        order: 6,
        status: 'published',
      },
      {
        title: 'Educational Facilities',
        slug: 'educational-facilities',
        excerpt: 'Safe, healthy learning environments for schools, daycares, and educational institutions.',
        description: '<p>Educational facilities need cleaning that protects student and staff health while maintaining safe, welcoming learning environments. We provide school-appropriate protocols and flexible scheduling.</p>',
        challenges: [
          'Student and staff health protection',
          'High-touch surface frequency',
          'Allergy and chemical sensitivities',
          'After-hours scheduling requirements',
        ],
        approach: 'Child-safe products, allergy-conscious protocols, and flexible scheduling around school activities.',
        solutions: [
          'Classroom cleaning',
          'Cafeteria sanitation',
          'Gymnasium and athletic facility care',
          'Restroom excellence',
          'Administrative office cleaning',
          'Playground and outdoor area care',
        ],
        order: 7,
        status: 'published',
      },
    ])

    // Create Offers
    console.log('🎁 Creating offers...')
    await Offer.insertMany([
      {
        title: 'One-Month Trial',
        slug: 'one-month-trial',
        excerpt: 'Experience our service quality risk-free with a one-month trial program.',
        description: '<p>Not sure if switching cleaning providers is worth the effort? Try Profile Environmental for one month with no long-term commitment. Experience our quality, professionalism, and customer service firsthand.</p><p>If you\'re not completely satisfied, there\'s no obligation to continue.</p>',
        terms: 'Available for new clients only. Standard service rates apply. Minimum facility size and service requirements must be met. Terms apply.',
        eligibility: 'New commercial clients with facilities requiring regular janitorial services.',
        ctaLabel: 'Request Trial Program',
        ctaUrl: '/booking',
        order: 1,
        status: 'published',
      },
      {
        title: 'Housekeeping Department Setup Consulting',
        slug: 'housekeeping-setup-consulting',
        excerpt: 'Expert consulting to establish or optimize your in-house housekeeping department.',
        description: '<p>Considering an in-house housekeeping team? We provide expert consulting to help you establish effective, efficient housekeeping operations. From hiring and training to systems and protocols, we share our industry expertise.</p>',
        terms: 'Consulting engagement terms and pricing provided upon request. Project scope determined during initial consultation.',
        eligibility: 'Organizations establishing or restructuring in-house cleaning departments.',
        ctaLabel: 'Schedule Consultation',
        ctaUrl: '/booking',
        order: 2,
        status: 'published',
      },
      {
        title: 'Staff Training Programs',
        slug: 'staff-training',
        excerpt: 'Professional training programs to elevate your cleaning staff\'s skills and effectiveness.',
        description: '<p>Invest in your cleaning team with professional training. We offer customized training programs covering proper techniques, safety protocols, infection prevention, green cleaning, and more.</p><p>Training can be delivered on-site or virtually, tailored to your specific needs.</p>',
        terms: 'Training programs quoted based on scope, duration, and number of participants. Contact for custom quote.',
        eligibility: 'Organizations with in-house or contracted cleaning staff.',
        ctaLabel: 'Inquire About Training',
        ctaUrl: '/booking',
        order: 3,
        status: 'published',
      },
      {
        title: 'Custom Cleaning Manual Creation',
        slug: 'cleaning-manual-creation',
        excerpt: 'Professional cleaning manuals tailored to your facility and operational requirements.',
        description: '<p>Clear, comprehensive cleaning manuals ensure consistency and quality. We create customized cleaning manuals specific to your facility, including protocols, procedures, safety requirements, and quality standards.</p><p>Perfect for organizations managing in-house teams or evaluating contractor performance.</p>',
        terms: 'Manual creation quoted based on facility type, complexity, and detail level required. Contact for quote.',
        eligibility: 'Any organization requiring formalized cleaning procedures documentation.',
        ctaLabel: 'Request Information',
        ctaUrl: '/booking',
        order: 4,
        status: 'published',
      },
    ])

    // Create FAQs
    console.log('❓ Creating FAQs...')
    await FAQ.insertMany([
      {
        question: 'What areas does Profile Environmental serve?',
        answer: 'We provide services across the Greater Toronto Area and surrounding regions. Contact us to confirm service availability for your specific location.',
        category: 'General',
        order: 1,
        status: 'published',
      },
      {
        question: 'Are your cleaning products safe and environmentally friendly?',
        answer: 'Yes. We use Green Seal certified, eco-friendly products that are safe for building occupants while being effective at cleaning and disinfection. We can also accommodate specific product requirements or sensitivities.',
        category: 'General',
        order: 2,
        status: 'published',
      },
      {
        question: 'How do you ensure consistent service quality?',
        answer: 'We implement rigorous quality control including regular inspections, supervisor oversight, client feedback systems, and detailed cleaning checklists. Our team undergoes ongoing training to maintain high standards.',
        category: 'Service Quality',
        order: 3,
        status: 'published',
      },
      {
        question: 'What if I\'m not satisfied with the cleaning?',
        answer: 'Client satisfaction is our priority. If you\'re not completely satisfied, contact us immediately. We will address concerns promptly and re-clean any areas that don\'t meet our standards at no additional charge.',
        category: 'Service Quality',
        order: 4,
        status: 'published',
      },
      {
        question: 'Do you provide services outside of regular business hours?',
        answer: 'Yes. We understand that cleaning during business hours can be disruptive. We offer flexible scheduling including evenings, nights, and weekends to accommodate your operational needs.',
        category: 'Scheduling',
        order: 5,
        status: 'published',
      },
      {
        question: 'How quickly can you start service?',
        answer: 'Timing depends on your facility requirements and our current capacity. For most standard commercial spaces, we can typically begin service within 1-2 weeks of agreement. Emergency or urgent needs may be accommodated sooner.',
        category: 'Scheduling',
        order: 6,
        status: 'published',
      },
      {
        question: 'Are your staff insured and background-checked?',
        answer: 'Absolutely. All staff undergo thorough background checks, are fully trained, and we carry comprehensive liability insurance and workers\' compensation coverage for your protection.',
        category: 'Trust & Safety',
        order: 7,
        status: 'published',
      },
      {
        question: 'What makes Profile Environmental different from other cleaning companies?',
        answer: 'We focus on comprehensive environmental support, not just basic cleaning. Our team includes infection prevention specialists, sustainability experts, and consultants who can help optimize your entire facility maintenance approach.',
        category: 'General',
        order: 8,
        status: 'published',
      },
    ])

    // Create Sample Products
    console.log('🛒 Creating products...')
    await Product.insertMany([
      {
        title: 'Professional Grade Disinfectant Spray',
        slug: 'professional-disinfectant-spray',
        excerpt: 'Hospital-grade disinfectant effective against a broad spectrum of pathogens.',
        description: '<p>EPA-registered hospital-grade disinfectant suitable for use on hard, non-porous surfaces. Effective against bacteria, viruses, and fungi.</p>',
        category: 'Disinfectants',
        priceLabel: 'Contact for pricing',
        showPrice: false,
        specifications: {
          'Size': '32 oz spray bottle',
          'Active Ingredient': 'Quaternary Ammonium',
          'Kill Time': '10 minutes',
          'Dilution': 'Ready-to-use',
        },
        inStock: true,
        featured: true,
        order: 1,
        status: 'published',
      },
      {
        title: 'Green Seal Certified All-Purpose Cleaner',
        slug: 'green-all-purpose-cleaner',
        excerpt: 'Eco-friendly, non-toxic cleaner safe for all surfaces and building occupants.',
        description: '<p>Green Seal certified all-purpose cleaner that delivers powerful cleaning without harsh chemicals. Biodegradable and safe for the environment.</p>',
        category: 'Green Cleaning',
        priceLabel: 'Contact for pricing',
        showPrice: false,
        specifications: {
          'Size': '1 gallon concentrate',
          'Certification': 'Green Seal GS-37',
          'Dilution Ratio': '1:64',
          'Fragrance': 'Light citrus',
        },
        inStock: true,
        featured: true,
        order: 2,
        status: 'published',
      },
      {
        title: 'Microfiber Cleaning Cloth Set',
        slug: 'microfiber-cleaning-cloth-set',
        excerpt: 'Professional-grade microfiber cloths for superior cleaning with less chemical usage.',
        description: '<p>High-quality microfiber cleaning cloths that capture dirt and bacteria more effectively than traditional cleaning methods. Reusable and sustainable.</p>',
        category: 'Supplies',
        priceLabel: 'Contact for pricing',
        showPrice: false,
        specifications: {
          'Quantity': '12-pack',
          'Size': '16" x 16"',
          'Material': '80/20 polyester/polyamide blend',
          'Colors': 'Color-coded set',
        },
        inStock: true,
        featured: true,
        order: 3,
        status: 'published',
      },
    ])

    // Create Sample Testimonials (Draft - not published without client approval)
    console.log('💬 Creating testimonials...')
    await Testimonial.insertMany([
      {
        name: 'Sample Client',
        company: 'Example Healthcare',
        role: 'Facilities Manager',
        quote: 'Demo testimonial - Replace with actual client testimonial after approval.',
        featured: false,
        order: 1,
        status: 'draft',
      },
    ])

    // Create Sample Resource
    console.log('📄 Creating resources...')
    await Resource.insertMany([
      {
        title: 'Infection Prevention Best Practices Guide',
        slug: 'infection-prevention-guide',
        description: 'Comprehensive guide covering infection prevention protocols and best practices for healthcare and commercial facilities.',
        category: 'Guides',
        pdfUrl: '/uploads/infection-prevention-guide.pdf',
        isGated: false,
        order: 1,
        status: 'published',
      },
      {
        title: 'Green Cleaning Certification Standards',
        slug: 'green-cleaning-standards',
        description: 'Overview of major green cleaning certifications including Green Seal, EcoLogo, and LEED requirements.',
        category: 'Guides',
        pdfUrl: '/uploads/green-cleaning-standards.pdf',
        isGated: false,
        order: 2,
        status: 'published',
      },
      {
        title: 'Facility Cleaning Checklist Template',
        slug: 'cleaning-checklist-template',
        description: 'Downloadable cleaning checklist template for maintaining consistent cleaning standards across your facility.',
        category: 'Templates',
        pdfUrl: '/uploads/cleaning-checklist-template.pdf',
        isGated: true,
        order: 3,
        status: 'published',
      },
    ])

    console.log('✅ Seed completed successfully!')
    console.log('\n📋 Summary:')
    console.log(`- Admin user created: admin@profilegroups.com / Admin@123`)
    console.log(`- Services: ${services.length}`)
    console.log(`- Markets: ${markets.length}`)
    console.log(`- Offers: 4`)
    console.log(`- FAQs: 8`)
    console.log(`- Products: 3`)
    console.log(`- Resources: 3`)
    console.log('\n⚠️  IMPORTANT:')
    console.log('- Contact information requires client confirmation (see confirmationNeeded flag)')
    console.log('- Jotform URLs are set from existing site')
    console.log('- Product pricing set to "Contact for pricing"')
    console.log('- Testimonials are in draft status pending client approval')
    console.log('- PDF resources need to be uploaded to /public/uploads/')

  } catch (error) {
    console.error('❌ Seed failed:', error)
  } finally {
    await mongoose.connection.close()
    console.log('\n👋 Database connection closed')
  }
}

seed()
