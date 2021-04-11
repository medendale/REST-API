const express = require('express')
const subscriber = require('../models/subscriber')
const router = express.Router()
const Subscriber = require('../models/subscriber')
//Geting all
router.get('/', async(req,res)=> {
try {
    const subscribers = await subscriber.find()
    res.json(subscribers)
} catch (error) {
   res.status(500).json({message:error.message}) 
}
})

//Geting one
router.get('/:id', getSubscriber,(req, res)=>{
res.json(res.subscriber)
})
//creating one
router.post('/', async (req,res)=>{
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (error) {
        res.status(400).json({message:error.message})
    }

})
//updating one
router.patch('/:id',getSubscriber, async (req,res) => {
  if (req.body.name != null){
      res.subscriber.name = req.body.name
  }
  if (req.body.subscribedToChannel != null){
      res.Subscriber.subscribedToChannel = req.body.subscribedToChannel
  }
  try {
      const updatedsubscriber = await res.subscriber.save()
      res.json(updatedsubscriber)
  } catch (error) {
      res.status(400).json({message:error.message})
  }
})
//deleting one
router.delete('/:id', getSubscriber,async (req,res)=>{
   try {
       await res.subscriber.remove()
       res.json({ message: 'Deleted Subscriber'})
   } catch (error) {
       res.status(500).json({message: error.message})
   }
})

async function getSubscriber(req,res,next) {
    let subscriber 
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null){
            return res.status(404).json({message:'canot find subscriber'})
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
    res.subscriber = subscriber
    next()
}
module.exports = router