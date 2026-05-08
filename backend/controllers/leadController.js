const supabase = require('../db');

exports.getLeads = async (req, res) => {
  try {
    let query = supabase.from('leads').select('*').order('created_at', { ascending: false });

    if (req.query.status) {
      query = query.eq('status', req.query.status);
    }
    if (req.query.lead_source) {
      query = query.eq('lead_source', req.query.lead_source);
    }
    if (req.query.assigned_salesperson) {
      query = query.eq('assigned_salesperson', req.query.assigned_salesperson);
    }
    // Search bonus
    if (req.query.search) {
      query = query.or(`lead_name.ilike.%${req.query.search}%,company_name.ilike.%${req.query.search}%,email.ilike.%${req.query.search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getLeadById = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Lead not found' });

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createLead = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([req.body])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('leads')
      .update({ ...req.body, updated_at: new Date().toISOString() })
      .eq('id', req.params.id)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Lead deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const { data, error } = await supabase.from('leads').select('*');
    if (error) throw error;

    const stats = {
      totalLeads: data.length,
      newLeads: data.filter(l => l.status === 'New').length,
      qualifiedLeads: data.filter(l => l.status === 'Qualified').length,
      wonLeads: data.filter(l => l.status === 'Won').length,
      lostLeads: data.filter(l => l.status === 'Lost').length,
      totalEstimatedValue: data.reduce((acc, curr) => acc + Number(curr.estimated_deal_value || 0), 0),
      totalWonValue: data.filter(l => l.status === 'Won').reduce((acc, curr) => acc + Number(curr.estimated_deal_value || 0), 0),
    };

    res.json(stats);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
