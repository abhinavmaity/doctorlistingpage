import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Avatar,
  Stack,
} from "@mui/material";
import { Doctor } from "../types/doctor";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <Card data-testid="doctor-card" sx={{ mb: 3, p: 2, boxShadow: 2 }}>
      <CardContent>
        <Box display="flex" gap={3}>
          {/* Left Section - Doctor Info */}
          <Box flex={1}>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Avatar
                src={doctor.photo}
                alt={doctor.name}
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: "primary.main",
                }}
              >
                {doctor.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography
                  data-testid="doctor-name"
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                >
                  {doctor.name}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {doctor.specialty.map((spec, index) => (
                    <Chip
                      key={index}
                      label={spec}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ mr: 0.5, mb: 0.5 }}
                      data-testid="doctor-specialty"
                    />
                  ))}
                </Stack>
              </Box>
            </Box>

            <Stack spacing={1.5}>
              <Box display="flex" alignItems="center" gap={1}>
                <WorkIcon color="action" fontSize="small" />
                <Typography
                  data-testid="doctor-experience"
                  color="text.secondary"
                >
                  {doctor.experience} years experience
                </Typography>
              </Box>

              {doctor.qualifications.length > 0 && (
                <Box display="flex" alignItems="center" gap={1}>
                  <LocalHospitalIcon color="action" fontSize="small" />
                  <Typography color="text.secondary">
                    {doctor.qualifications.join(", ")}
                  </Typography>
                </Box>
              )}

              <Box display="flex" alignItems="center" gap={1}>
                <LocationOnIcon color="action" fontSize="small" />
                <Typography color="text.secondary">
                  {doctor.clinic}, {doctor.location}
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Right Section - Fee and Booking */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "space-between",
              minWidth: "200px",
            }}
          >
            <Box textAlign="right">
              <Typography
                data-testid="doctor-fee"
                variant="h5"
                color="primary"
                fontWeight="bold"
                gutterBottom
              >
                ₹{doctor.fee}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Consultation Fee
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                minWidth: "180px",
                mt: 2,
              }}
            >
              Book Appointment
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
