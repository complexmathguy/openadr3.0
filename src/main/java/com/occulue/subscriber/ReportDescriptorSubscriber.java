/*******************************************************************************
  Turnstone Biologics Confidential
  
  2018 Turnstone Biologics
  All Rights Reserved.
  
  This file is subject to the terms and conditions defined in
  file 'license.txt', which is part of this source code package.
   
  Contributors :
        Turnstone Biologics - General Release
 ******************************************************************************/
package com.occulue.subscriber;

import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.axonframework.queryhandling.QueryGateway;
import org.axonframework.queryhandling.SubscriptionQueryResult;
import org.axonframework.messaging.responsetypes.ResponseTypes;

import org.springframework.context.ApplicationContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.stereotype.Component;


import com.occulue.api.*;
import com.occulue.entity.*;
import com.occulue.exception.*;

/**
 * Subscriber for ReportDescriptor related events.  .
 * 
 * @author your_name_here
 *
 */
@Component("reportDescriptor-subscriber")
public class ReportDescriptorSubscriber extends BaseSubscriber {

	public ReportDescriptorSubscriber() {
		queryGateway = applicationContext.getBean(QueryGateway.class);
	}
	
    public SubscriptionQueryResult<List<ReportDescriptor>, ReportDescriptor> reportDescriptorSubscribe() {
        return queryGateway
                .subscriptionQuery(new FindAllReportDescriptorQuery(), 
                		ResponseTypes.multipleInstancesOf(ReportDescriptor.class),
                		ResponseTypes.instanceOf(ReportDescriptor.class));
    }

    public SubscriptionQueryResult<ReportDescriptor, ReportDescriptor> reportDescriptorSubscribe(@DestinationVariable UUID reportDescriptorId) {
        return queryGateway
                .subscriptionQuery(new FindReportDescriptorQuery(new LoadReportDescriptorFilter(reportDescriptorId)), 
                		ResponseTypes.instanceOf(ReportDescriptor.class),
                		ResponseTypes.instanceOf(ReportDescriptor.class));
    }




    // -------------------------------------------------
    // attributes
    // -------------------------------------------------
	@Autowired
    private final QueryGateway queryGateway;
}

