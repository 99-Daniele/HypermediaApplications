import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const client = serverSupabaseClient(event);

  const project = await client
    .from('projects')
    .select(`id, area`)
    .eq('id', id)
    .limit(1)
    .single();
  
  const  {data, error} = await client
      .from('projects')
      .select(`id, projectTitle, city, area, mainIdea, socialImpact, economicImpact, slogan, date, persons (id, name, surname)`)
      .eq('area', project.data.area);

  if (error) {
    throw createError({ statusCode: 400, statusMessage: error.message });
  }

  return data;
});
