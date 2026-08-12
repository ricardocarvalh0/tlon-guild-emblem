import { Card, CardContent, Container, Grid, Typography } from '@mui/material'

const items = Array.from({ length: 9 }, (_, index) => index + 1)

function GridPage() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Grid Page
      </Typography>
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {items.map((item) => (
          <Grid key={item} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" component="h2">
                  Item {item}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Placeholder content for grid cell {item}.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default GridPage
