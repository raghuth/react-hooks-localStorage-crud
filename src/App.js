import "./App.css";
import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Swal from "sweetalert2";

function App() {
  const [todoItems, setTodoItems] = useState(() => {
    const savedData = localStorage.getItem("todoItems");
    if (savedData) {
      return JSON.parse(savedData);
    } else {
      return [];
    }
  });

  const [todo, setTodo] = useState("");

  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
  }, [todoItems]);

  function handleIInputChange(e) {
    setTodo(e.target.value);
  }
 
  function handleFormSubmit(e) {
    e.preventDefault();

    if (todo !== "") {
      setTodoItems([
        ...todoItems,
        {
          id: todoItems.length + 1,
          text: todo.trim(),
        },
      ]);
      Swal.fire( 'Created successfully',
      '',
      'success');
    }
    // clear out the input box
    setTodo("");
  }

  const ClearAll = () => {
    localStorage.clear();
    window.location.reload();
  };

  const Delete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        let newTodo = todoItems.filter((item) => item.id !== id);
        setTodoItems([...newTodo]);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
   
  };
 
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className="m-t-20"
      >
        <Grid item lg={4}>
          <form onSubmit={handleFormSubmit}>
            <TextField
              fullWidth
              label="Add new todo"
              name="todo"
              value={todo}
              onChange={handleIInputChange}
              id="fullWidth"
              variant="outlined"
              inputProps={{
                autoComplete: "off",
                autoFocus: true,
              }}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className="m-t-20"
            >
              Save
            </Button>
            <Button
              color="primary"
              variant="contained"
              className="m-t-20 m-l-20"
              onClick={ClearAll}
            >
              ClearAll
            </Button>
          </form>
          {todoItems.length === 0 &&  <div className="m-t-20 text-Align">No data</div>}
          {todoItems.map((todo, i) => (
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              key={i}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={todo.text}
                  secondary={<React.Fragment></React.Fragment>}
                />
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    Delete(todo.id || "");
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          ))}
        </Grid>
      </Grid>
    </>
  );
}

export default App;
