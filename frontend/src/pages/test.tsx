import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import MusiqueIcon from '@mui/icons-material/MusicNote';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { getFormations } from '../services/api';

{/**<LaptopMacIcon /> */}

interface Formation {
  id : number;
  title : string;
  // le backend peut renvoyer une string ISO ou un objet Date
  dateStart: string | Date;
  dateEnd: string | Date;
  description: string;
  typeFormation: string;
}


export default function Formation() {
  // On va récupérer les formations depuis l'API ici
  const [formation, setFormation] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      let mounted = true;
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await getFormations();
          if (!mounted) return;
          setFormation(Array.isArray(data) ? data : []);
        } catch (e) {
          console.error(e);
          if (!mounted) return;
          setError("Impossible de récupérer les formations.");
        } finally {
          if (mounted) setLoading(false);
        }
      })();
  
      return () => {
        mounted = false;
      };
    }, []);

  return (
    <section className="card">
      <h2>Mes formations suivies</h2>
      {error && (
        <div role="alert" style={{ color: "#f88" }}>
          {error}
        </div>
      )}

      {!loading && !error && formation.length === 0 && (
        <p>Aucune formation disponible pour le moment.</p>
      )}
      {!loading && !error && formation.length > 0 && (
        <Timeline position="alternate">
          {formation.map( formation => 
            ItemContent(formation)
          )}
        
        </Timeline>
    )}
    </section>
  );
}

function ItemContent(formation: Formation) {
  return (
    <TimelineItem>
        {LeftContent(formation)}
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
            {selectIcon(formation.typeFormation)}
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        {RightContent(formation)}
    </TimelineItem>
  )
}

function RightContent(formation: Formation){
  return (
    <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            {formation.title}
          </Typography>
          <Typography>{formation.description}</Typography>
    </TimelineContent>
  )
}

function LeftContent(formation: Formation){
  return (
    <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align={formation.id % 2 === 0 ? "right" : "left"}
          variant="body2"
          color="text.secondary"
        >
          {formatDate(formation.dateStart)} - {formatDate(formation.dateEnd)}
        </TimelineOppositeContent>
  )
}

function formatDate(d: string | Date) {
  if (!d) return "";
  const dateObj = typeof d === 'string' ? new Date(d) : d;
  if (Number.isNaN(dateObj.getTime())) return String(d);
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }).format(dateObj);
}

function selectIcon(typeFormation: string){
  switch(typeFormation){
    case 'Informatique':
      return <LaptopMacIcon />;
    case 'Musique':
      return <MusiqueIcon />;
    default:
      return <MusiqueIcon />;
  }
}