const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Initialize Supabase Client with Service Role or Anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const testUsers = [
  { email: 'admin@ata.com', password: 'password123', fullName: 'أحمد المسؤول', role: 'admin', isApproved: true },
  { email: 'volunteer@ata.com', password: 'password123', fullName: 'خالد المتطوع', role: 'volunteer', isApproved: true },
  { email: 'donor@ata.com', password: 'password123', fullName: 'سارة المتبرعة', role: 'donor', isApproved: true },
  { email: 'org@ata.com', password: 'password123', fullName: 'جمعية البر الخيرية', role: 'organization', isApproved: true },
  { email: 'beneficiary@ata.com', password: 'password123', fullName: 'عمر المستفيد', role: 'beneficiary', isApproved: true },
];

async function seedDatabase() {
  console.log("🌱 Starting to seed test users...");

  for (const user of testUsers) {
    try {
      // 1. Sign up user via Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
      });

      if (authError) {
        console.log(`⚠️ User ${user.email} might already exist: ${authError.message}`);
        continue;
      }

      if (authData.user) {
        // 2. Insert profile record
        const { error: profileError } = await supabase.from('profiles').upsert({
          id: authData.user.id,
          full_name: user.fullName,
          role: user.role,
          is_approved: user.isApproved,
        });

        if (profileError) {
          console.error(`❌ Failed to create profile for ${user.email}:`, profileError.message);
        } else {
          console.log(`✅ Successfully created [${user.role.toUpperCase()}] account: ${user.email}`);
        }
      }
    } catch (err) {
      console.error(`❌ Error processing ${user.email}:`, err);
    }
  }

  console.log("🏁 Seeding complete! You can now sign in using any of the test emails with password: password123");
}

seedDatabase();