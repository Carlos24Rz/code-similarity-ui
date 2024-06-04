// @ts-nocheck
"use client";

import { Paper, Typography } from "@mui/material";
import * as React from "react";
import * as D3 from "d3";
import { usePathname, useRouter } from 'next/navigation';

const WIDTH = 500;
const HEIGHT = 500;

export default function SubmissionListForceGraph(props) {
  const { nodes, links }  = props;

  const router = useRouter();
  const pathname = usePathname();

  const svgRef = React.useRef();

  React.useEffect(() => {
    if(!svgRef.current){
      return;
    }

    const currentSvg = D3.select(svgRef.current)

    // Create copy of nodes and links
    const matrixNodes = nodes.map(node => ({...node}));
    const matrixLinks = links.map(link => ({...link}));

    // Create a simulation with several forces.
    const simulation = D3.forceSimulation(matrixNodes)
    .force("link",
      D3.forceLink(matrixLinks)
      .id(d => d.id)
      .distance(d => d.distance)
    )
    .force("charge", D3.forceManyBody())
    .force("center", D3.forceCenter(WIDTH / 2, HEIGHT/ 2))
    
    // Create a tooltip
    const tooltip = currentSvg.append("g")
    .classed("tooltip-area", true)
    .style('opacity', 0)
    
    tooltip.append("text")
    .classed("tooltip-author", true)
    
    tooltip.append("text")
    .classed("tooltip-filename", true)
    .attr("y", 15);

    // Add a line for each link, and a circle for each node.
    const link = currentSvg.append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .selectAll()
    .data(matrixLinks)
    .join("line");

    const node = currentSvg.append("g")
    .selectAll()
    .data(matrixNodes)
    .join("g")
    .call(D3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended)
    );

    
    node
    .append("circle")
    .attr("r", 10)
    .style("fill", "#EB7333")
    .on(
      "mouseover", (event, d) => {
        D3.select(event.currentTarget)
        .style("fill", "#E69669")
        .style("cursor", "pointer");

        const authorText = currentSvg.select(".tooltip-author");
        authorText.text(`Autor: ${d.author}`);

        const filenameText = currentSvg.select(".tooltip-filename");
        filenameText.text(`Archivo: ${d.filename}`);

        tooltip
          .attr('transform', `translate(${d.x + 20}, ${d.y - 30})`);

        tooltip
        .style("opacity", 1);
    })
    .on(
      "mouseout", (event, d) => {
        D3.select(event.currentTarget)
        .style("fill", "#EB7333")
        .style("cursor", "default");

        tooltip
        .style("opacity", 0);
    })
    .on(
      "click", (event, d) => {
        router.push(`${pathname}/submission/${d.id}`);
      }
    )

    // Reheat the simulation when drag starts, and fix the subject position.
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    // Update the subject (dragged node) position during drag.
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it’s no longer being dragged.
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    simulation.on("tick", () => {
      link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
      
      node
      .attr("transform", d => `translate(${d.x}, ${d.y})`);
    });

    return () => {
      simulation.stop();
      currentSvg.selectChildren("*").remove();
    }

  }, [nodes, links])

  return (
    <Paper
    sx={{
      pt: 3,
      px: 3
    }}>
      <Typography sx={{
        fontWeight: 500
      }}
      variant="h5" component="h3">Cluster de similitud</Typography>
      <Typography>Puedes visualizar la similitud y relacion entre las entregas</Typography>
      <svg height={HEIGHT} width={WIDTH} ref={svgRef} />
    </Paper>
  );
}

