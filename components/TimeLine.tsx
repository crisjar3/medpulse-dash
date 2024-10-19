


export default function TimeLine() {
  return (
    <div className="p-6 sm:p-10">
      <div className="relative pl-7 after:absolute after:inset-y-0 after:w-px after:bg-gray-500/10 dark:after:bg-gray-400/20">
        <h2 className="mb-8 text-2xl font-bold">Siguientes Citas</h2>
        <div className="grid gap-10">
          <div className="grid gap-1 text-sm relative">
            <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-gray-50" />
            <div className="font-medium">8:00 AM</div>
            <div className="text-gray-500 dark:text-gray-400">
              Consulta con Juan
            </div>
          </div>
          <div className="grid gap-1 text-sm relative">
            <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-gray-50" />
            <div className="font-medium">April 1, 2023 - Introduced subscription plans</div>
            <div className="text-gray-500 dark:text-gray-400">
              We've launched new subscription plans to provide more value to our customers.
            </div>
          </div>
          <div className="grid gap-1 text-sm relative">
            <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-gray-50" />
            <div className="font-medium text-gray-900 dark:text-gray-50">
              June 12, 2023 - Shipped major feature update
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              Our engineering team has been working on a significant feature update that is now live.
            </div>
          </div>
          <div className="grid gap-1 text-sm relative">
            <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-gray-50" />
            <div className="font-medium">December 31, 2023 - Year-end platform improvements</div>
            <div className="text-gray-500 dark:text-gray-400">
              We're making some behind-the-scenes improvements to the platform to ensure a smooth experience for our
              users.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}