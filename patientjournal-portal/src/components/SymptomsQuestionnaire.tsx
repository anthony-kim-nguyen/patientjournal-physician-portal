import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  onUpdate: (questions: string[]) => void;
};

// 🧠 Predefined list of common symptom questions
const commonQuestions = [
  'How well are you managing your pain?',
  'How well did you sleep last night?',
  'How well are you coping with anxiety?',
  'Have you been adhering to your breathing exercise?',
  'How would you rate your mobility?',
  'Are you adhering to your POC diet?',
  'Have you been adhering to your medications?',
  'Custom',
];

export default function SymptomsQuestionnaire({ onUpdate }: Props) {
  const [selected, setSelected] = useState('');
  const [customQuestion, setCustomQuestion] = useState('');
  const [symptomQuestions, setSymptomQuestions] = useState<string[]>([]);

  // 🔁 Notify parent component of changes to the question list
  useEffect(() => {
    console.log('📤 Updating parent with questions:', symptomQuestions);
    onUpdate(symptomQuestions);
  }, [symptomQuestions]);

  // ➕ Add a selected or custom question to the list
  const handleAdd = () => {
    const questionToAdd = selected === 'Custom' ? customQuestion.trim() : selected;

    // Prevent empty or duplicate questions
    if (!questionToAdd || symptomQuestions.includes(questionToAdd)) return;

    console.log('➕ Adding question:', questionToAdd);
    setSymptomQuestions((prev) => [...prev, questionToAdd]);
    setSelected('');
    setCustomQuestion('');
  };

  // ❌ Remove a question by index
  const handleRemove = (index: number) => {
    console.log('❌ Removing question at index:', index);
    setSymptomQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Symptom Questionnaire
      </Typography>

      {/* 📋 List of added questions with remove buttons */}
      <List dense>
        {symptomQuestions.map((q, i) => (
          <ListItem key={i} divider>
            <ListItemText primary={q} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleRemove(i)} color="error">
                <CloseIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {/* 🔽 Dropdown + Add button */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          select
          label="Select Question"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          fullWidth
          sx={{ flex: 7 }}
        >
          {commonQuestions.map((q, i) => (
            <MenuItem key={i} value={q}>
              {q}
            </MenuItem>
          ))}
        </TextField>

        <Button
          onClick={handleAdd}
          color="primary"
          variant="text"
          startIcon={<AddIcon />}
          sx={{ alignSelf: 'center', flex: 3 }}
        >
          <Typography variant="button">Add Question</Typography>
        </Button>
      </Box>

      {/* 📝 Custom question input if "Custom" selected */}
      {selected === 'Custom' && (
        <TextField
          label="Custom Question"
          value={customQuestion}
          onChange={(e) => setCustomQuestion(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
      )}
    </Box>
  );
}
