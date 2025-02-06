import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";

export function ProfileCard({user}) {
    
    return (
        <Card className="w-96">
            <CardHeader floated={false} className="h-80">
                <img src="https://docs.material-tailwind.com/img/team-3.jpg" alt="profile-picture" />
            </CardHeader>
            <CardBody className="text-center">
                <Typography variant="h4" color="blue-gray" className="mb-2">
                    {user.name || "Nombre no disponible"} {user.lastname || "Apellido no disponible"}
                </Typography>
                <Typography color="blue-gray" className="font-medium" textGradient>
                    {user.cargo || "Cargo no disponible"}
                </Typography>
            </CardBody>
           
        </Card>
    );
}

