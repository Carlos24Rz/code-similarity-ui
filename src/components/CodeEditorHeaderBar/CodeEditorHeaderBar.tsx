import { Box, Typography } from "@mui/material";
import { InsertDriveFileOutlined } from "@mui/icons-material";

interface Props {
    filename: string;
    author: string;
}


export default function CodeEditorHeaderBar(props: Props) {
    const { filename, author } = props;

    return (
        <Box sx={{
            display: "flex",
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 1,
            mb: 1,
        }}>
            <InsertDriveFileOutlined color="primary"/>
            <Typography color="primary" variant="subtitle2">
                {filename}
            </Typography>
        </Box>
    )
}