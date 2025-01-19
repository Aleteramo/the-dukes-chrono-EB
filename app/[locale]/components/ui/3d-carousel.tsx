"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"
import { Product } from '../../../../utils/products';
import { getSoldProducts } from '../../../../utils/products';
import { useTranslations } from 'next-intl';

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  const handleChange = () => {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()

    matchMedia.addEventListener("change", handleChange)

    return () => {
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1], filter: "blur(4px)" }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] }

const Carousel = memo(
  ({
    handleClick,
    controls,
    cards,
    isCarouselActive,
  }: {
    handleClick: (product: Product, index: number) => void
    controls: any
    cards: Product[]
    isCarouselActive: boolean
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const cylinderWidth = isScreenSizeSm ? 1100 : 1800
    const faceCount = cards.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )
    const t = useTranslations('Products');

    return (
      <div
        className="flex h-full items-center justify-center bg-black/10"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) =>
            isCarouselActive &&
            rotation.set(rotation.get() + info.offset.x * 0.05)
          }
          onDragEnd={(_, info) =>
            isCarouselActive &&
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.05,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
          }
          animate={controls}
        >
          {cards.map((product, i) => (
            <motion.div
              key={`key-${product.id}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center rounded-xl bg-black/10 p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(product, i)}
            >
              <motion.div
                className="w-full rounded-xl overflow-hidden shadow-lg"
                initial={{ filter: "blur(4px)" }}
                animate={{ filter: "blur(0px)" }}
                transition={transition}
              >
                <img
                  src={product.image}
                  alt={t(`watches.${product.translationKey}.name`)}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-black/20 text-gold">
                  <h3 className="text-lg font-semibold">
                    {t(`watches.${product.translationKey}.name`)}
                  </h3>
                  <p className="text-sm text-gold/80">
                    {t(`watches.${product.translationKey}.price`)}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)

function ThreeDPhotoCarousel() {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const controls = useAnimation()
  const t = useTranslations('Products');

  const cards = useMemo(() => getSoldProducts(), [])

  const handleClick = (product: Product) => {
    setActiveProduct(product)
    setIsCarouselActive(false)
    controls.stop()
  }

  const handleClose = () => {
    setActiveProduct(null)
    setIsCarouselActive(true)
  }

  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {activeProduct && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            layoutId={`img-container-${activeProduct.id}`}
            layout="position"
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 m-5 md:m-36 lg:mx-[19rem] rounded-3xl"
            style={{ willChange: "opacity" }}
            transition={transitionOverlay}
          >
            <motion.div
              layoutId={`img-${activeProduct.id}`}
              className="max-w-full max-h-full bg-black/80 rounded-lg shadow-2xl p-8"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.5,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{
                willChange: "transform",
              }}
            >
              <img
                src={activeProduct.image}
                alt={t(`watches.${activeProduct.translationKey}.name`)}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
              <div className="mt-4 text-center text-gold">
                <h2 className="text-2xl font-bold">
                  {t(`watches.${activeProduct.translationKey}.name`)}
                </h2>
                <p className="text-gold/80 mt-2">
                  {t(`watches.${activeProduct.translationKey}.description`)}
                </p>
                <p className="text-xl font-semibold mt-4">
                  {t(`watches.${activeProduct.translationKey}.price`)}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative h-[500px] w-full overflow-hidden">
        <Carousel
          handleClick={handleClick}
          controls={controls}
          cards={cards}
          isCarouselActive={isCarouselActive}
        />
      </div>
    </motion.div>
  )
}

export { ThreeDPhotoCarousel };
