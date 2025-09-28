export async function uploadAudio(file: Buffer, fileName: string) {
    const { data, error } = await supabase.storage
      .from('audio-exports')
      .upload(fileName, file, { contentType: 'audio/mpeg' });
  
    if (error) throw error;
    return supabase.storage.from('audio-exports').getPublicUrl(fileName).data.publicUrl;
  }