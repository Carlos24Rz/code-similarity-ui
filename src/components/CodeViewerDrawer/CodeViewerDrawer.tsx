import * as React from 'react';
import { Typography, Box, Drawer, Toolbar, Accordion, AccordionSummary, AccordionDetails, Checkbox } from '@mui/material';
import { SubmissionSimilarity } from '@/lib/definitions';
import AnimatedCircularProgress from '../AnimatedCircularProgress/AnimatedCircularProgress';
import { ExpandMore, InsertDriveFileOutlined, PermIdentityOutlined } from '@mui/icons-material';
import { highlightcolorSet } from '@/utils/editorSimmilarityDecorations';

interface Props {
  submissionSimilarity: SubmissionSimilarity;
  selectedHashes: Set<string>; 
  onHashChange: (hash: string) => void;
}

export default function CodeViewerDrawer(props: Props) {
  const { submissionSimilarity, selectedHashes, onHashChange } = props
  
  return (
    <Drawer
     sx={{
       width: 360,
       flexShrink: 0,
       [`& .MuiDrawer-paper`]: { width: 360, boxSizing: 'border-box' },
     }}
     variant='permanent'
     open
     anchor='right'
   >
     <Toolbar />
     <Box
       sx={{
         backgroundColor: "primary.dark",
         height: 72,
         display: "flex",
         justifyContent: "center",
         alignItems: "center"
       }}
     >
       <Typography color="white" fontWeight={500} variant="h5" component="h1">Reporte de Similitud</Typography>
     </Box>
     <Box
       sx={{
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         my: 3
       }}
     >
       <AnimatedCircularProgress
           variant="determinate"
           size="8rem"
           value={submissionSimilarity.similarity}
           color={
               submissionSimilarity.similarity >= 75 ? "error"
               : (submissionSimilarity.similarity >= 50 && submissionSimilarity.similarity < 75) ? "warning"
               : "primary"
           }
           labelSize={32}
       />
    </Box>
    <Box>
      <Accordion disableGutters defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMore />}
        >
          Detalles de la entrega
        </AccordionSummary>
        <AccordionDetails>
         <Box
           sx={{
             pl: 2,
             display: "flex",
             flexDirection: "column",
             gap: 1
           }}
         >
           <Box sx={{ display: "flex", gap: 1  }}>
             <PermIdentityOutlined color="primary"/>
             <Typography color="gray" fontWeight={500} >{submissionSimilarity.submissionA.author}</Typography>
           </Box>
           <Box sx={{ display: "flex", gap: 1  }}>
             <InsertDriveFileOutlined color="primary"/>
             <Typography color="gray" fontWeight={500} >{submissionSimilarity.submissionA.filename}</Typography>
           </Box>
         </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMore />}
        >
          Detalles de la entrega similar
        </AccordionSummary>
        <AccordionDetails>
         <Box
           sx={{
             pl: 2,
             display: "flex",
             flexDirection: "column",
             gap: 1
           }}
         >
           <Box sx={{ display: "flex", gap: 1  }}>
             <PermIdentityOutlined color="primary"/>
             <Typography color="gray" fontWeight={500} >{submissionSimilarity.submissionB.author}</Typography>
           </Box>
           <Box sx={{ display: "flex", gap: 1  }}>
             <InsertDriveFileOutlined color="primary"/>
             <Typography color="gray" fontWeight={500} >{submissionSimilarity.submissionB.filename}</Typography>
           </Box>
         </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMore />}
        >
          Coincidencias
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Puedes filtrar las secciones similares en la visualización en base al color del resaltado</Typography>
          <Box>
            {
              submissionSimilarity.matches.map((match, idx) => (
                <Checkbox
                  key={match.hash}
                  checked={selectedHashes.has(match.hash)}
                  onChange={() => onHashChange(match.hash)}
                  sx={{
                    color: highlightcolorSet[idx % highlightcolorSet.length],
                    "&.Mui-checked": {
                      color: highlightcolorSet[idx % highlightcolorSet.length]
                    }
                  }}
                />
              ))
            }
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  </Drawer> 
  )
}
