"use server"

async function create(formData: FormData) {
     
    //const session = await getServerSession(authOptions)
    
    //const { userId } = session as any;

    if(formData.name === "" || formData.name === null){
        return "Name is required"
    }
    if(formData.start === null){
        return "Start date is required"
    }if(formData.end === null){
        return "End date is required"
    }

    const prisma = new PrismaClient();
    const event = await prisma.event.create({
        data: {
            name: formData.name,
            start: formData.start,
            end: formData.end,
            allDay: formData.allDay || false,
            tags: formData.tags || [],
            url: formData.url || "",
            userId: 'clj4r8ksv0000v6c0e1wfh71g',
            resourceId: "1",
            createdAt: new Date(),
        },
    });
    console.log(event)


}