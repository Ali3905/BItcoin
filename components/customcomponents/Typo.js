import Typography from "@mui/material/Typography"

export default function Typo({ children, className }) {
    return (
        <Typography className={className}>
            {children}
        </Typography>
    )

}