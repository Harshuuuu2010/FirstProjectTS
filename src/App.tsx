import React, { useState } from 'react';
import { TextField, Button, Typography, Box, List, ListItem, ListItemText, Container } from '@mui/material';

const gifts = ["Phone", "TV", "Laptop", "Headphones"];

interface Friend {
  name: string;
  gift: string;
}

const App = () => {
  const [name, setName] = useState("");
  const [friends, setFriends] = useState<Friend[]>([]);

  // Handle name input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  // Add friend with "No gift assigned"
  const handleAddFriend = () => {
    if (name.trim() === "") return;
    setFriends([...friends, { name, gift: "No gift assigned" }]);
    setName("");
  };

  // Assign random gifts to all friends
  const handleAssignGifts = () => {
    const updatedFriends = friends.map(friend => ({
      ...friend,
      gift: gifts[Math.floor(Math.random() * gifts.length)],
    }));
    setFriends(updatedFriends);
  };

  // Shuffle gifts among all friends
  const handleShuffleGifts = () => {
    const shuffledGifts = friends.map(friend => friend.gift).sort(() => Math.random() - 0.5);
    const updatedFriends = friends.map((friend, index) => ({
      ...friend,
      gift: shuffledGifts[index] || "No gift assigned",
    }));
    setFriends(updatedFriends);
  };

  // Reset gifts to "No gift assigned"
  const handleResetGifts = () => {
    const updatedFriends = friends.map(friend => ({
      ...friend,
      gift: "No gift assigned",
    }));
    setFriends(updatedFriends);
  };

  return (
    <Container 
      maxWidth="sm" 
      sx={{
        marginTop: '2rem', 
        display: 'flex', 
        flexDirection: 'column', 
        ml:{sm:'364px',xs:'24px'},
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh', 
        padding: '0 16px'
      }}
    >
      <Typography 
        variant='h4' 
        gutterBottom 
        sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
      >
        New Year Gift Planner
      </Typography>
      
      <Box display="flex" gap={2} mb={2} flexDirection={{ xs: 'column', sm: 'row' }}>
        <TextField
          type="text"
          value={name}
          onChange={handleInputChange}
          placeholder="Enter friend's name"
          fullWidth
          sx={{ mb: { xs: 2, sm: 0 } }}
        />
        <Button 
          variant='contained' 
          color='primary' 
          onClick={handleAddFriend}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Submit
        </Button>
      </Box>
      
      <Box 
        display="flex" 
        justifyContent="space-between" 
        mb={2}
        flexDirection={{ xs: 'column', sm: 'row' }} 
        gap={1}
      >
        <Button 
          variant="outlined" 
          color="success"  
          onClick={handleAssignGifts}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Add
        </Button>
        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={handleShuffleGifts}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Shuffle
        </Button>
        <Button 
          variant="outlined" 
          color="error" 
          onClick={handleResetGifts}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Reset
        </Button>
      </Box>
      
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
      >
        Friend List
      </Typography>
      
      {friends.length > 0 ? (
        <List sx={{ width: '100%' }}>
          {friends.map((friend, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${friend.name} - ${friend.gift}`} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No friends added yet!</Typography>
      )}
    </Container>
  );
};

export default App;
