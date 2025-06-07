const supabase = require("../config/db");
// get all existing tasks
const getTasks = async (req, res) => {
  try {
    const { data, error } = await supabase.from("tasks").select("*");
    if (error) return res.status(500).json({ error: error.message });

    console.log(data);
    return res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// add task api
const addTask = async (req, res) => {
  const { title, desc, due_date, status } = req.body;
  try {
    const { data, error } = await supabase
      .from("tasks")
      .insert([{ title, desc, due_date, status }]);
    if (error) {
      return res.status(500).json({ error: "internal server error" });
    }
    console.log("data inserted successfully", data);
    return res.status(200).json({ message: "data inserted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// edit task api
const editTask = async (req, res) => {
  const { id } = req.params;
  const { title, due_date, status, desc } = req.body;
  try {
    // check if existing
    const { data: existingData, error: fetchError } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", id)
      .single();
    if (fetchError) {
      return res.status(404).json({ error: "no data found" });
    }

    // update the task
    const { data, error } = await supabase
      .from("tasks")
      .update({ title, due_date, status, desc })
      .eq("id", id)
      .single();
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({
      message: "Task updated successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

// delete task ki api
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    // check if existing
    const { data: existingData, error: fetchError } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", id)
      .single();
    if (fetchError) {
      return res.status(404).json({ error: "no data found" });
    }
    // check if existing
    const { data, error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      return res.status(500).json({ error: "internal server error" });
    }
    return res.status(200).json({ message: "task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getTasks, addTask, editTask, deleteTask };
