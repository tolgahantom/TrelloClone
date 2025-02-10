import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://nwohnxfjbipfvakqgyhv.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53b2hueGZqYmlwZnZha3FneWh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4MzE4MjEsImV4cCI6MjA1NDQwNzgyMX0.75anYQwKruMhd-eNAtwNybSCDAii9w3R3RhSnqe9Hlk',
      {
        auth: { persistSession: false },
      }
    );
  }

  getClient() {
    return this.supabase;
  }
}
