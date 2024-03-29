import React, { Component } from "react";
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ChromePicker } from "react-color";
import { Button } from "@mui/material";
import withStyles from "react-jss";
import chroma from "chroma-js";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import drawerWidth from "./config";

const styles = {
  btnContainer: {
    position: "relative",
    width: "85%",
    margin: "60px auto 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& Button": {
      "@media (max-width : 400px)": {
        fontSize: "10px",
      },
    },
  },
  form: {
    position: "relative",
    width: "85%",
    margin: "0 auto",
    "& div": {
      position: "relative",
      display: "block",
      width: "100%",
      boxSizing: "border-box",
      "& input": {
        boxSizing: "border-box",
        height: "50px",
        marginBottom: "15px",
      },
    },
    "& Button": {
      "@media (max-width : 400px)": {
        fontSize: "10px",
      },
    },
  },
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

class CreatePaletteSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palette: this.props.palette,
      color: this.props.color,
    };
  }

  render() {
    const {
      handleDrawerClose,
      classes,
      palette,
      handleRandomColor,
      handleColorChange,
      handleChange,
      color,
      open,
      name,
      handleSubmit,
      handleClearPalette,
    } = {
      ...this.props,
    };
    return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            "@media (max-width : 750px)": {
              width: "100%",
            },
          },
          "@media (max-width : 750px)": {
            width: "100%",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div className={classes.btnContainer}>
          <Button
            variant="contained"
            color="error"
            onClick={handleClearPalette}
          >
            Clear Palette
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRandomColor}
            disabled={palette.length === 20}
          >
            Pick Random
          </Button>
        </div>
        <ChromePicker
          color={color}
          onChangeComplete={(color) => handleColorChange(color)}
        />
        <ValidatorForm
          onSubmit={handleSubmit}
          onError={(errors) => console.log(errors)}
          className={classes.form}
        >
          <TextValidator
            label="name"
            onChange={handleChange}
            name="name"
            value={name}
            validators={["required", "isSameName", "isSameColor"]}
            errorMessages={[
              "this field is required",
              "Same name already exist",
              "Same color already exist",
            ]}
          />
          <Button
            disabled={palette.length === 20}
            variant="contained"
            type="submit"
            style={{
              backgroundColor: color,
              width: "100%",
              margin: "0 auto",
              color: chroma(color).luminance() < 0.2 ? "#fff" : "#000",
            }}
          >
            {palette.length === 20 ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
        {/* <PaletteBox name={name} colors={palette} /> */}
      </Drawer>
    );
  }
}

export default withStyles(styles)(CreatePaletteSideBar);
