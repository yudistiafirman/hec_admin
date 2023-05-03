import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  ImageListItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../../Default";
import Swal from "sweetalert2";
import moment from "moment";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import HecContainer from "../../components/atoms/HContainer";
import HSpacer from "../../components/atoms/HSpacer";
import HDetailText from "../../components/molecules/HDetailText";

const CareerDetail = ({ openDetail, closeDetail, careerId }) => {
  return (
    <HecContainer>
      <Typography sx={{ color: "var(--text)" }} component="h2" variant="h3">
        Security
      </Typography>
      <HSpacer size="small" />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            backgroundColor: "var(--light)",
            flex: 0.7,
            padding: 2,
            borderRadius: 2,
            border: "1px solid var(--border)",
          }}
        >
          <img
            style={{
              borderRadius: "5px",
              border: "1px solid var(--light-grey)",
            }}
            width="100%"
            height={400}
            src={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format`}
            srcSet={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            loading="lazy"
            alt="#"
          />
          <HSpacer size="large" />
          <Typography
            sx={{ fontWeight: "500", color: "var(--secondary-text)" }}
            component="h2"
            variant="subtitle1"
          >
            Deskripsi Pekerjaan
          </Typography>
          <Typography
            sx={{ fontWeight: "500", color: "var(--text)", fontSize: 14 }}
            component="h2"
            variant="subtitle1"
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum,
            dicta minus itaque expedita voluptatum illum cumque! Velit, nesciunt
            obcaecati hic, aut voluptatum beatae ducimus fuga ex voluptas
            commodi quod fugit?
          </Typography>
          <HSpacer size="large" />
          <Typography
            sx={{ fontWeight: "500", color: "var(--secondary-text)" }}
            component="h2"
            variant="subtitle1"
          >
            Tanggung Jawab
          </Typography>
          <Box sx={{ display: "flex" }}>
            <RadioButtonUncheckedIcon
              sx={{ fontSize: 12, marginTop: 0.6 }}
              color="var(--text)"
            />
            <HSpacer size="extraSmall" />
            <Typography
              sx={{ fontWeight: "500", color: "var(--text)", fontSize: 14 }}
              component="h2"
              variant="subtitle1"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              quaerat ipsa iusto minima blanditiis fugit alias nisi obcaecati
              vero! Libero voluptates voluptate alias perspiciatis obcaecati nam
              praesentium, modi maxime perferendis.
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <RadioButtonUncheckedIcon
              sx={{ fontSize: 12, marginTop: 0.6 }}
              color="var(--text)"
            />
            <HSpacer size="extraSmall" />
            <Typography
              sx={{ fontWeight: "500", color: "var(--text)", fontSize: 14 }}
              component="h2"
              variant="subtitle1"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              quaerat ipsa iusto minima blanditiis fugit alias nisi obcaecati
              vero! Libero voluptates voluptate alias perspiciatis obcaecati nam
              praesentium, modi maxime perferendis.
            </Typography>
          </Box>
          <HSpacer size="large" />
          <Typography
            sx={{ fontWeight: "500", color: "var(--secondary-text)" }}
            component="h2"
            variant="subtitle1"
          >
            Persyaratan
          </Typography>
          <Box sx={{ display: "flex" }}>
            <RadioButtonUncheckedIcon
              sx={{ fontSize: 12, marginTop: 0.6 }}
              color="var(--text)"
            />
            <HSpacer size="extraSmall" />
            <Typography
              sx={{ fontWeight: "500", color: "var(--text)", fontSize: 14 }}
              component="h2"
              variant="subtitle1"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              quaerat ipsa iusto minima blanditiis fugit alias nisi obcaecati
              vero! Libero voluptates voluptate alias perspiciatis obcaecati nam
              praesentium, modi maxime perferendis.
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <RadioButtonUncheckedIcon
              sx={{ fontSize: 12, marginTop: 0.6 }}
              color="var(--text)"
            />
            <HSpacer size="extraSmall" />
            <Typography
              sx={{ fontWeight: "500", color: "var(--text)", fontSize: 14 }}
              component="h2"
              variant="subtitle1"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              quaerat ipsa iusto minima blanditiis fugit alias nisi obcaecati
              vero! Libero voluptates voluptate alias perspiciatis obcaecati nam
              praesentium, modi maxime perferendis.
            </Typography>
          </Box>
        </Box>
        <HSpacer size="extraLarge" />
      </Box>
    </HecContainer>
  );
};

export default CareerDetail;
