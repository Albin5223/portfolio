import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import MusiqueIcon from "@mui/icons-material/MusicNote";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { getFormations } from "../services/api";
import "./formation.css";

interface Formation {
  id: number;
  title: string;
  dateStart: string | Date;
  dateEnd: string | Date;
  description: string;
  typeFormation: string;
}


export default function Formation() {
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
    <section id="formation" className="formation">
      <div className="formation-inner">
        <header className="formation-header">
          <p className="formation-kicker">Parcours</p>
          <h2 className="formation-title">Formations et diplomes</h2>
          <p className="formation-lede">
            Decouvrez mon parcours academique et les formations que j'ai suivies.
          </p>
        </header>

        {loading && <p className="formation-status">Chargement des formations...</p>}

        {error && (
          <div className="formation-error" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && formation.length === 0 && (
          <p className="formation-empty">Aucune formation disponible pour le moment.</p>
        )}

        {!loading && !error && formation.length > 0 && (
          <Timeline position="alternate" className="formation-timeline">
            {formation.map((item) => (
              FormationItem({ formation: item })
            ))}
          </Timeline>
        )}
      </div>
    </section>
  );
}

function FormationItem({ formation }: { formation: Formation }) {
  return (
    <TimelineItem className="formation-item">
      <TimelineOppositeContent
        sx={{ m: 'auto 0' }}
        className="formation-date"
        align={formation.id % 2 === 0 ? "right" : "left"}
      >
        {formatDate(formation.dateStart)} - {formatDate(formation.dateEnd)}
      </TimelineOppositeContent>

      <TimelineSeparator className="formation-separator">
        <TimelineConnector className="formation-connector" />
        <TimelineDot className="formation-dot">
          {selectIcon(formation.typeFormation)}
        </TimelineDot>
        <TimelineConnector className="formation-connector" />
      </TimelineSeparator>

      <TimelineContent className="formation-card" sx={{ py: '12px', px: 2 }}>
        <div className="formation-badge">{formation.typeFormation || "Formation"}</div>
        <Typography component="h3" variant="h6" className="formation-card-title">
          {formation.title}
        </Typography>
        <Typography component="p" className="formation-card-desc">
          {formation.description}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

function formatDate(d: string | Date) {
  if (!d) return "";
  const dateObj = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(dateObj.getTime())) return String(d);
  return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "long", year: "numeric" }).format(dateObj);
}

function selectIcon(typeFormation: string) {
  switch (typeFormation) {
    case "Informatique":
      return <LaptopMacIcon fontSize="small" />;
    case "Musique":
      return <MusiqueIcon fontSize="small" />;
    default:
      return <LaptopMacIcon fontSize="small" />;
  }
}