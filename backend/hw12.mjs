db["cars"].aggregate([
  {
    $addFields: {
      insuranceCost: {
        $switch: {
          branches: [
            {
              case: { $gt: ["$insurance", 1500] },
              then: "Висока",
            },
            {
              case: { $gte: ["$insurance", 500] },
              then: "Середня",
            },
            {
              case: { $lt: ["$insurance", 500] },
              then: "Низька",
            },
          ],
        },
      },
    },
  },
])

{
  permissions: {
    menu: {
      view: true
      edit: true
      remove: false
    }
  }
}
