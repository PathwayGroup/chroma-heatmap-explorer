
// Use a more recent version of the Deno standard library
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    console.log('Analyzing contrast for URL:', url);

    // For now, we'll use the mock data from mockData.ts
    const { getColorPairsForUrl } from './mockData.ts';
    const colorPairs = await getColorPairsForUrl(url);

    // Calculate summary statistics
    const summary = colorPairs.reduce(
      (acc, pair) => {
        acc.total++;
        if (pair.passes.AA) acc.passing.AA++;
        else acc.failing.AA++;
        
        if (pair.passes.AALarge) acc.passing.AALarge++;
        else acc.failing.AALarge++;
        
        if (pair.passes.AAA) acc.passing.AAA++;
        else acc.failing.AAA++;
        
        if (pair.passes.AAALarge) acc.passing.AAALarge++;
        else acc.failing.AAALarge++;
        
        return acc;
      },
      {
        total: 0,
        passing: { AA: 0, AALarge: 0, AAA: 0, AAALarge: 0 },
        failing: { AA: 0, AALarge: 0, AAA: 0, AAALarge: 0 }
      }
    );

    // Store the analysis in the database
    const { data, error } = await supabase
      .from('contrast_analyses')
      .insert({
        url,
        screenshot: 'https://i.imgur.com/LBKJsHs.png', // Mock screenshot URL
        color_pairs: colorPairs,
        summary
      })
      .select()
      .single();

    if (error) throw error;

    // Convert snake_case db response to camelCase for the frontend
    const result = {
      id: data.id,
      url: data.url,
      screenshot: data.screenshot,
      colorPairs: data.color_pairs,
      summary: data.summary,
      createdAt: data.created_at
    };

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in analyze-contrast function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
