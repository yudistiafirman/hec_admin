import React from "react";
import HecContainer from "../atoms/HContainer";
import { Box, Typography } from "@mui/material";
import HImage from "../atoms/Himage";

import HSpacer from "../atoms/HSpacer";
import HDetailText from "../molecules/HDetailText";
import dayjs from "dayjs";

const BASE_URL =
	process.env.NODE_ENV === "production"
		? process.env.REACT_APP_API_URL_PROD
		: process.env.REACT_APP_API_URL_DEV;

const HParticipantDetail = ({
	image,
	address,
	participantName,
	email,
	phoneNumber,
	registerDate,
	nis,
}) => {
	return (
		<Box
			sx={{
				backgroundColor: "var(--light)",

				padding: 2,
				borderRadius: 2,
				border: "1px solid var(--border)",
			}}
		>
			<Box sx={{ display: "flex", flexDirection: "row" }}>
				<img
					style={{
						borderRadius: "5px",
						border: "1px solid var(--light-grey)",
					}}
					width="30%"
					height={400}
					src={`${BASE_URL}/${image}`}
					loading="lazy"
					alt="#"
				/>
				<HSpacer size="extraLarge" />
				<Box>
					<HDetailText
						title="Nama Peserta"
						detail={participantName}
					/>
					<HSpacer size="large" />
					<HDetailText title="NIS Peserta" detail={nis} />
					<HSpacer size="large" />
					<HDetailText title="Email Peserta" detail={email} />
					<HSpacer size="large" />
					<HDetailText
						title="No Handphone Peserta"
						detail={phoneNumber ?? "-"}
					/>
					<HSpacer size="large" />
					<HDetailText
						title="Tanggal Pendaftaran"
						detail={dayjs(registerDate).format("MM/DD/YYYY")}
					/>
					<HSpacer size="large" />

					<HDetailText
						title="Alamat Peserta"
						detail={address ?? "-"}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default HParticipantDetail;
