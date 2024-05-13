import { StyledLinkContainer } from './LinkBox.styled'
import PropTypes from 'prop-types'
import { gsap } from 'gsap'
import React, { useRef, useEffect, forwardRef, useState } from 'react'
import { getArticleCategories } from '../../ApiCalls'

function LinkBox({ pages, linkList, updatePages }) {
    let clickCount
    let keyTicker = 0
    let destTop, destLeft, bananaDest;

    const linksContainer = useRef();

  if (document.querySelector('#click-counter')) {
      clickCount = document.querySelector('#click-counter')
      bananaDest = clickCount.getBoundingClientRect();

      destTop = bananaDest.top;
      destLeft = bananaDest.left;
  }

  function handleClick(event) {
    const gameData = JSON.parse(localStorage.getItem('gameData'))
    gameData.clicks = clickCount.innerText.replace(' Clicks', '')
    gameData.links.push(event.target.href)
    localStorage.setItem('gameData', JSON.stringify(gameData))
        updatePages(event.target.textContent)
        var element = document.querySelector('.outer-container')
        var currentWidth = element.offsetWidth
        let newWidth = currentWidth += 340
        document.getElementById('link-tails').scrollTop = 0
        element.style.width = `${newWidth}px`
  }

  useEffect(() => {
    if(pages.length === 1) {
        let tl = gsap.timeline()
        tl.fromTo(
            '#links-container', 
            { left: '-330' },
            { duration: 1, ease: 'bounce', left: 0 },
        )
    }
  }, [pages])

    useEffect(() => {
        if(pages.length > 1) {
            const banana = document.createElement('p')
            banana.textContent= '+🍌'
            banana.id = 'banana'
            const mainPage = document.querySelector('.background-container')
            mainPage.appendChild(banana)
            const tl = gsap.timeline({
                onComplete: () => {
                    mainPage.removeChild(banana);
                }
            });
            tl.fromTo('#banana', {
                scale: '5',
                filter: 'drop-shadow(2px 4px 3px black)',
                y: '-160px',
                x: '129px',
                zIndex: '100',
                position: 'absolute'
            },
            {
                scale: '1',
                y: '-350',
                x: destLeft,
                duration: '2',
                ease: 'sine.inOut',
                zIndex: '100',
                position: 'absolute',
                opacity: 0.5,
            })
        }

        }, [pages])

    
    let linkTails
    if(linkList) {
        if (linkList === "Banana") {
            linkTails = Array(100).fill(<p>banana</p>);
        } else {
            linkTails = linkList.map((link) => {
                keyTicker += 1;

                return (
                    <>
                        <a key={keyTicker} onClick={(event) => {
                            event.preventDefault()
                            handleClick(event)
                        }} 
                        href={link.url}
                        id={`${link.title.toLowerCase()}_LL`}
                        >{link.title}</a>
                    </>
                )
            })
        }
    } else {
        linkTails = <p> No Links to display here! Click the back button. </p>
    }

    return (
        <StyledLinkContainer ref={linksContainer} id='links-container'>
                    {linkList != 'Banana' && <header><h4>Destinations:</h4></header>}
                    <div id='link-tails'>{linkTails}</div>
        </StyledLinkContainer>
    )
}

LinkBox.propTypes = {
    linkList: PropTypes.array.isRequired,
    updatePages: PropTypes.func.isRequired,
    checkForWin: PropTypes.func.isRequired,
}

export default forwardRef(LinkBox)