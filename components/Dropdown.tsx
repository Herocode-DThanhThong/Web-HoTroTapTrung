import { useRoom } from "@/hooks/index";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

const Dropdown = () => {
  const { room } = useRoom();
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Work with me</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex items-center justify-between ">
            <span>{room.owner?.displayName}</span>
            <span>🗝️</span>
          </div>
          {room.guests.map((guest, index) => (
            <div
              key={guest.uid}
              className="flex mt-2 items-center justify-between"
            >
              <span>{guest.displayName}</span>
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Dropdown;
