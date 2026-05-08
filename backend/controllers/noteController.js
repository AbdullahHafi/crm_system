const supabase = require('../db');

exports.getNotesByLeadId = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('lead_id', req.params.leadId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addNote = async (req, res) => {
  try {
    const { lead_id, note_content, created_by } = req.body;
    
    const { data, error } = await supabase
      .from('notes')
      .insert([{ lead_id, note_content, created_by }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
