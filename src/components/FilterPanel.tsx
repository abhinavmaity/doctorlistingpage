import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Paper,
  Divider,
} from "@mui/material";
import { ConsultationType, SortType } from "../types/doctor";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SortIcon from "@mui/icons-material/Sort";

interface FilterPanelProps {
  consultationType: ConsultationType;
  specialties: string[];
  selectedSpecialties: string[];
  sortBy: SortType;
  onConsultationTypeChange: (type: ConsultationType) => void;
  onSpecialtyChange: (specialty: string) => void;
  onSortChange: (sort: SortType) => void;
}

const FilterPanel = ({
  consultationType,
  specialties,
  selectedSpecialties,
  sortBy,
  onConsultationTypeChange,
  onSpecialtyChange,
  onSortChange,
}: FilterPanelProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Consultation Type Filter */}
      <Box mb={4}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <VideoCallIcon color="primary" />
          <Typography
            data-testid="filter-header-moc"
            variant="h6"
            fontWeight="bold"
          >
            Mode of Consultation
          </Typography>
        </Box>
        <RadioGroup
          value={consultationType}
          onChange={(e) =>
            onConsultationTypeChange(e.target.value as ConsultationType)
          }
        >
          <FormControlLabel
            data-testid="filter-video-consult"
            value="Video Consult"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "primary.main",
                  },
                }}
              />
            }
            label="Video Consultation"
            sx={{ mb: 1 }}
          />
          <FormControlLabel
            data-testid="filter-in-clinic"
            value="In Clinic"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "primary.main",
                  },
                }}
              />
            }
            label="In-clinic Consultation"
          />
        </RadioGroup>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Specialties Filter */}
      <Box mb={4}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <LocalHospitalIcon color="primary" />
          <Typography
            data-testid="filter-header-speciality"
            variant="h6"
            fontWeight="bold"
          >
            Specialties
          </Typography>
        </Box>
        <FormGroup>
          {specialties.map((specialty) => (
            <FormControlLabel
              key={specialty}
              data-testid={`filter-specialty-${specialty.replace("/", "-")}`}
              control={
                <Checkbox
                  checked={selectedSpecialties.includes(specialty)}
                  onChange={() => onSpecialtyChange(specialty)}
                  sx={{
                    "&.Mui-checked": {
                      color: "primary.main",
                    },
                  }}
                />
              }
              label={specialty}
              sx={{ mb: 1 }}
            />
          ))}
        </FormGroup>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Sort Filter */}
      <Box>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <SortIcon color="primary" />
          <Typography
            data-testid="filter-header-sort"
            variant="h6"
            fontWeight="bold"
          >
            Sort By
          </Typography>
        </Box>
        <RadioGroup
          value={sortBy || ""}
          onChange={(e) => onSortChange(e.target.value as SortType)}
        >
          <FormControlLabel
            data-testid="sort-fees"
            value="fees"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "primary.main",
                  },
                }}
              />
            }
            label="Fees (Low to High)"
            sx={{ mb: 1 }}
          />
          <FormControlLabel
            data-testid="sort-experience"
            value="experience"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "primary.main",
                  },
                }}
              />
            }
            label="Experience (High to Low)"
          />
        </RadioGroup>
      </Box>
    </Paper>
  );
};

export default FilterPanel;
