import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateBooking } from "@workspace/api-client-react";
import {
  Sparkles,
  Scissors,
  Droplets,
  HeartHandshake,
  Brush,
  Wind,
  Flower2,
  CalendarCheck,
  Star,
  MapPin,
  Phone,
  Clock
} from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Gallery", href: "#gallery" },
  { name: "Reviews", href: "#reviews" },
  { name: "Contact", href: "#contact" },
];

// Form Schema
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Please provide a little more detail"),
});

export default function Home() {
  const { toast } = useToast();
  const createBooking = useCreateBooking();
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = (values: z.infer<typeof contactSchema>) => {
    createBooking.mutate(
      { data: values },
      {
        onSuccess: () => {
          toast({
            title: "Appointment Request Sent!",
            description: "Thank you! We will get back to you soon.",
          });
          form.reset();
        },
        onError: () => {
          toast({
            title: "Something went wrong",
            description: "Please try again or call us directly.",
            variant: "destructive",
          });
        },
      }
    );
  };

  const services = [
    { icon: <Sparkles className="w-6 h-6" />, title: "Bridal Makeup", desc: "Complete bridal makeup with long-lasting finish for your special day." },
    { icon: <Brush className="w-6 h-6" />, title: "Party Makeup", desc: "Glamorous party looks that make you shine at every celebration." },
    { icon: <Scissors className="w-6 h-6" />, title: "Hair Cutting & Styling", desc: "Expert cuts and styling to give your hair a fresh new look." },
    { icon: <Droplets className="w-6 h-6" />, title: "Facial & Skincare", desc: "Deep cleansing facials and skincare treatments for glowing skin." },
    { icon: <HeartHandshake className="w-6 h-6" />, title: "Waxing", desc: "Smooth and gentle waxing services for silky soft skin." },
    { icon: <Wind className="w-6 h-6" />, title: "Threading", desc: "Precise eyebrow and facial threading for a clean, defined look." },
    { icon: <Flower2 className="w-6 h-6" />, title: "Hair Spa", desc: "Nourishing hair spa treatments to restore shine and vitality." },
    { icon: <Sparkles className="w-6 h-6" />, title: "Mehndi", desc: "Beautiful traditional and modern mehndi designs for all occasions." },
  ];

  const reviews = [
    { name: "Priya Sharma", text: "Excellent bridal makeup! I felt like a queen on my wedding day. The team is so professional and talented.", rating: 5 },
    { name: "Sunita Verma", text: "Best parlour in Satna! The facial treatment made my skin glow. Highly recommended for everyone.", rating: 5 },
    { name: "Anjali Singh", text: "Loved the hair spa treatment. My hair feels so silky and healthy. Will definitely visit again.", rating: 4 },
    { name: "Kavita Patel", text: "The mehndi designs are simply beautiful. Very artistic and the quality is top-notch. Great service!", rating: 5 },
  ];

  return (
    <div className="w-full">
      <Navbar />

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* hero elegant woman with soft makeup in a bright modern salon */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2574&auto=format&fit=crop" 
            alt="Beauty Salon Background" 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-secondary font-medium tracking-widest uppercase mb-4 block">
                Premium Beauty Services
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6">
                Welcome to <br/>
                <span className="text-primary-foreground">A-One Beauty</span>
              </h1>
              <p className="text-xl text-white/90 mb-10 max-w-lg font-light leading-relaxed">
                Enhancing your natural beauty with expert care, premium products, and a touch of elegance in the heart of Satna.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg shadow-lg shadow-primary/30 group">
                  <a href="#contact" className="flex items-center gap-2">
                    Book Appointment
                    <CalendarCheck className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-white text-white hover:bg-white/10 px-8 py-6 text-lg backdrop-blur-sm">
                  <a href="#services">Our Services</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section id="about" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="About Us" 
            subtitle="Discover the passion and expertise behind our premium beauty services."
          />
          
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-primary/5 rounded-3xl transform -rotate-3 z-0"></div>
              {/* beautifully arranged makeup brushes and palettes */}
              <img 
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2000&auto=format&fit=crop" 
                alt="Makeup Tools" 
                className="relative z-10 rounded-2xl shadow-xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl z-20 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Star className="w-6 h-6 text-primary" fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">Top Rated</p>
                    <p className="text-sm text-muted-foreground">Salon in Satna</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-3xl font-display font-semibold mb-6 text-foreground">
                Enhancing Your Natural Beauty
              </h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                A-One Beauty Parlour offers professional beauty and skincare services in Satna. Our goal is to help every customer look and feel their best with quality beauty treatments.
              </p>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                With years of experience and a passion for beauty, we provide personalized services that bring out your natural radiance. From flawless bridal makeovers to rejuvenating skincare routines, we are dedicated to excellence.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-4xl font-display font-bold text-primary mb-2">10+</h4>
                  <p className="font-medium text-foreground">Years Experience</p>
                </div>
                <div>
                  <h4 className="text-4xl font-display font-bold text-secondary mb-2">1k+</h4>
                  <p className="font-medium text-foreground">Happy Clients</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Our Services" 
            subtitle="Explore our wide range of premium beauty treatments designed just for you."
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION (Placeholder as requested) */}
      <section id="gallery" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Our Work Gallery" 
            subtitle="A glimpse into the stunning transformations crafted by our experts."
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { id: 1, label: "Bridal Look", src: "/gallery/gallery-1.jpg", alt: "Bridal Makeup" },
              { id: 2, label: "Party Makeup", src: "/gallery/gallery-2.jpg", alt: "Party Makeup" },
              { id: 3, label: "Hair Styling", src: "/gallery/gallery-3.jpg", alt: "Hair Styling" },
              { id: 4, label: "Skincare", src: "/gallery/gallery-4.jpg", alt: "Skincare Treatment" },
              { id: 5, label: "Mehndi Design", src: "/gallery/gallery-5.jpg", alt: "Mehndi Design" },
              { id: 6, label: "Hair Spa", src: "/gallery/gallery-6.jpg", alt: "Hair Spa" },
              { id: 7, label: "Engagement", src: "/gallery/gallery-7.jpg", alt: "Engagement Makeup" },
              { id: 8, label: "Makeup Art", src: "/gallery/gallery-8.jpg", alt: "Makeup Artistry" },
            ].map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="relative aspect-square rounded-2xl overflow-hidden bg-muted group"
              >
                <img 
                  src={item.src} 
                  alt={item.alt} 
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-display font-medium text-lg tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {item.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section id="reviews" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-black/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading 
            title="What Our Clients Say" 
            light={true}
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-xl shadow-black/5 text-foreground"
              >
                <div className="flex gap-1 mb-4 text-secondary">
                  {[...Array(5)].map((_, index) => (
                    <Star 
                      key={index} 
                      className={`w-4 h-4 ${index < review.rating ? "fill-secondary" : "fill-muted text-muted"}`} 
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic relative z-10">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary">
                    {review.name.charAt(0)}
                  </div>
                  <span className="font-semibold">{review.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Get In Touch" 
            subtitle="Book your appointment today and let us pamper you."
          />
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-card border border-border/50 rounded-3xl p-8 mb-8 shadow-sm">
                <h3 className="text-2xl font-display font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Our Location</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Gandhi Chowk, Ganpat Marg, Nazirabad, <br/>Satna, Madhya Pradesh 485001, India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Phone Number</h4>
                      <a href="tel:+919303959697" className="text-muted-foreground hover:text-primary transition-colors">
                        +91 9303959697
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Opening Hours</h4>
                      <p className="text-muted-foreground">Mon - Sun: 10:00 AM - 8:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Iframe */}
              <div className="rounded-3xl overflow-hidden shadow-lg border border-border/50 h-[300px] relative">
                <iframe 
                  src="https://maps.google.com/maps?q=A-One+Beauty+Parlour,+Gandhi+Chowk,+Nazirabad,+Satna,+Madhya+Pradesh+485001&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Location"
                  className="absolute inset-0"
                ></iframe>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-border/50">
                <h3 className="text-3xl font-display font-bold mb-2">Book an Appointment</h3>
                <p className="text-muted-foreground mb-8">Fill out the form below and we'll get back to you to confirm your booking.</p>
                
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <Input 
                      id="name" 
                      placeholder="Jane Doe" 
                      className="rounded-xl px-4 py-6 bg-muted/30 focus-visible:ring-primary/20"
                      {...form.register("name")}
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="yourname@email.com" 
                      className="rounded-xl px-4 py-6 bg-muted/30 focus-visible:ring-primary/20"
                      {...form.register("email")}
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Service Needed / Message</label>
                    <Textarea 
                      id="message" 
                      placeholder="I would like to book a bridal makeup consultation..." 
                      className="rounded-xl px-4 py-4 min-h-[150px] bg-muted/30 focus-visible:ring-primary/20 resize-none"
                      {...form.register("message")}
                    />
                    {form.formState.errors.message && (
                      <p className="text-sm text-destructive mt-1">{form.formState.errors.message.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={createBooking.isPending}
                    className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white py-6 text-lg font-medium shadow-lg shadow-primary/25 disabled:opacity-70"
                  >
                    {createBooking.isPending ? "Sending..." : "Send Request"}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a1114] text-white/70 py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-6">A-One <span className="text-secondary">Beauty</span></h2>
              <p className="max-w-xs mx-auto md:mx-0">
                Enhancing your natural beauty with expert care and premium services in Satna.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-3">
                {NAV_LINKS.slice(1).map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="hover:text-secondary transition-colors inline-block">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 uppercase tracking-wider">Contact</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start justify-center md:justify-start gap-3">
                  <MapPin className="w-5 h-5 text-secondary shrink-0" />
                  <span>Gandhi Chowk, Ganpat Marg,<br/>Nazirabad, Satna,<br/>MP 485001</span>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3">
                  <Phone className="w-5 h-5 text-secondary shrink-0" />
                  <a href="tel:+919303959697" className="hover:text-white">+91 9303959697</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>&copy; {new Date().getFullYear()} A-One Beauty Parlour. All rights reserved.</p>
            <a
              href="/admin"
              className="text-white/40 hover:text-white/80 transition-colors text-xs tracking-wide"
            >
              Admin Dashboard
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
