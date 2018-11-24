import {Router, Request, Response} from 'express';
import Server from '../classes/server';

const router = Router();

router.get('/messages', (req: Request,res: Response)=> {
    res.json({
        ok:true,
        mensaje: 'Todo good'
    });
});

router.post('/messages', (req: Request,res: Response)=> {
    const body = req.body.body;
    const from = req.body.from;
    const payload = {
        from,
        body
    }
    const server = Server.instance;

    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok:true,
        mensaje: 'Mensaje post'
    });
});

router.post('/messages/:id', (req: Request,res: Response) => {
    const body = req.body.body;
    const from = req.body.from;
    const id = req.params.id;
    
    const payload = {
        from,
        body
    }

    const server = Server.instance;

    server.io.in(id).emit('mensaje-privado', payload);

    res.json({
        ok:true,
        body,
        from,
        id
    });
    
})

export default router;